/**
 * Hardcoded skill list — edit this to control what appears in "The Full Stack" section.
 * Order within each category is preserved.
 */
const SKILLS = {
  Frontend:       ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
  Backend:        ['Node.js', 'Express', 'WordPress', 'PostgreSQL', 'MySQL'],
  DevOps:         ['Docker', 'GitHub Actions', 'GitLab CI', 'Nginx'],
  Infrastructure: ['Linux Servers', 'Email Servers', 'DNS', 'SSL/TLS'],
};

/**
 * Skills component — renders the full-stack skill list grouped by category.
 * Independent of project data.
 */
export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="section-title">The Full Stack</h2>
      <div className="skills__groups">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div key={category} className="skills__group">
            <h3 className="skills__group-label">{category}</h3>
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
