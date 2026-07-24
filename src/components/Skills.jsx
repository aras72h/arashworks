import projects from '../data/projects.js';

/**
 * Derives a deduplicated list of tech stack tags from the static projects data.
 * Preserves first-seen insertion order.
 */
const skills = [...new Set(projects.flatMap((p) => p.techStack))];

/**
 * Maps each known skill to a category group.
 * Skills not listed here fall into the "Other" group.
 */
const SKILL_GROUPS = {
  Frontend:  ['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Modular Scale'],
  Backend:   ['NodeJS', 'ExpressJS', 'JWT Tokens', 'bcrypt'],
  Database:  ['PostgreSQL', 'Sequelize ORM'],
  Tools:     ['Vercel'],
};

/**
 * Skills component for the portfolio.
 * Renders each unique technology from the project data as a styled badge/tag,
 * grouped by category (Frontend, Backend, Database, Tools, Other).
 * No props, no state — derived from static project data at module load time.
 */
export default function Skills() {
  // Build the grouped entries: for each known category, filter to skills present
  // in the actual project data. Then collect unrecognised skills into "Other".
  const recognisedSkills = new Set(Object.values(SKILL_GROUPS).flat());

  const groups = Object.entries(SKILL_GROUPS)
    .map(([category, list]) => ({
      category,
      items: skills.filter((skill) => list.includes(skill)),
    }))
    .filter(({ items }) => items.length > 0);

  const otherItems = skills.filter((skill) => !recognisedSkills.has(skill));

  if (otherItems.length > 0) {
    groups.push({ category: 'Other', items: otherItems });
  }

  return (
    <section className="skills" id="skills">
      <h2 className="section-title">Tech Stack</h2>
      <div className="skills__groups">
        {groups.map(({ category, items }) => (
          <div key={category}>
            <h3 className="skills__group-label">
              {category}
              <span className="skills__count">{items.length}</span>
            </h3>
            <ul className="skills__list">
              {items.map((skill) => (
                <li key={skill}>
                  <span className="skills__tag">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
