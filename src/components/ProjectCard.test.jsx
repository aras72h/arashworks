// Feature: portfolio-integration, Property 1: description truncation boundary
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import ProjectCard from './ProjectCard.jsx';

// Mock @sedaat/image-gen — no real canvas in jsdom
vi.mock('@sedaat/image-gen', () => ({ generateImg: vi.fn() }));

// Suppress jsdom canvas getContext errors
beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

const defaultProps = {
  title: 'Test Project',
  techStack: ['React'],
  links: [{ name: 'GitHub', url: 'https://github.com' }],
};

describe('ProjectCard — Property 1: description truncation boundary', () => {
  it('short descriptions (≤90 chars) render in full without a Read More button', () => {
    // Validates: Requirements 2.5
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 90 }),
        (description) => {
          render(<ProjectCard {...defaultProps} description={description} />);
          // Query the paragraph directly and check its text content
          const para = screen.getByRole('article').querySelector('.project-description');
          expect(para).toBeTruthy();
          expect(para.textContent).toBe(description);
          // No "Read More" button for short descriptions
          expect(screen.queryByRole('button', { name: /read more/i })).toBeNull();
          cleanup();
        }
      )
    );
  });

  it('long descriptions (≥91 chars) render truncated text with a Read More button', () => {
    // Validates: Requirements 2.5
    fc.assert(
      fc.property(
        fc.string({ minLength: 91 }),
        (description) => {
          render(<ProjectCard {...defaultProps} description={description} />);
          // The displayed paragraph text should be the truncated version (90 chars + …)
          const para = screen.getByRole('article').querySelector('.project-description');
          const displayedText = para ? para.textContent : '';
          // Displayed text must be ≤ 91 characters (90 chars + the single ellipsis char)
          expect(displayedText.length).toBeLessThanOrEqual(91);
          // Should contain the ellipsis character
          expect(displayedText).toContain('…');
          // "Read More" button must be present
          expect(screen.getByRole('button', { name: /read more/i })).toBeTruthy();
          cleanup();
        }
      )
    );
  });
});

// ------------------------------------------------------------
// Unit tests for ProjectCard — task 3.6
// Requirements: 2.5, 2.6
// ------------------------------------------------------------

const LONG_DESC =
  'A' + 'b'.repeat(90); // 91 chars — just over the 90-char boundary

describe('ProjectCard — unit tests', () => {
  it('clicking "Read More" reveals the full description', async () => {
    // Validates: Requirements 2.5, 2.6
    const user = userEvent.setup();
    render(<ProjectCard {...defaultProps} description={LONG_DESC} />);

    // Before clicking: full description should NOT be visible (truncated)
    const para = screen.getByRole('article').querySelector('.project-description');
    expect(para.textContent).toContain('…');
    expect(para.textContent).not.toBe(LONG_DESC);

    // Click "Read More"
    await user.click(screen.getByRole('button', { name: /read more/i }));

    // After clicking: full description should be visible
    expect(para.textContent).toBe(LONG_DESC);
    // Button label should now be "Show Less"
    expect(screen.getByRole('button', { name: /show less/i })).toBeTruthy();
  });

  it('clicking "Show Less" collapses the description back', async () => {
    // Validates: Requirements 2.5, 2.6
    const user = userEvent.setup();
    render(<ProjectCard {...defaultProps} description={LONG_DESC} />);

    // Expand first
    await user.click(screen.getByRole('button', { name: /read more/i }));

    const para = screen.getByRole('article').querySelector('.project-description');
    expect(para.textContent).toBe(LONG_DESC);

    // Now collapse
    await user.click(screen.getByRole('button', { name: /show less/i }));

    expect(para.textContent).toContain('…');
    expect(para.textContent).not.toBe(LONG_DESC);
    expect(screen.getByRole('button', { name: /read more/i })).toBeTruthy();
  });

  it('"Read More" button is NOT rendered when description is ≤90 chars', () => {
    // Validates: Requirements 2.5
    const shortDesc = 'x'.repeat(90); // exactly 90 chars — at the boundary
    render(<ProjectCard {...defaultProps} description={shortDesc} />);

    expect(screen.queryByRole('button', { name: /read more/i })).toBeNull();

    // Full description should appear as-is
    const para = screen.getByRole('article').querySelector('.project-description');
    expect(para.textContent).toBe(shortDesc);
  });

  it('external links render with target="_blank"', () => {
    // Validates: Requirements 2.6
    const links = [
      { name: 'GitHub', url: 'https://github.com/test' },
      { name: 'Live Demo', url: 'https://example.com' },
    ];
    render(<ProjectCard {...defaultProps} description="short" links={links} />);

    const anchors = screen.getAllByRole('link');
    expect(anchors.length).toBe(links.length);
    anchors.forEach((a) => {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
