import { useRef, useEffect } from 'react';
import { generateImg } from '@sedaat/image-gen';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import Skills from './components/Skills.jsx';
import ContactForm from './components/ContactForm.jsx';
import projects from './data/projects.js';

export default function App() {
  const bgRef = useRef(null);

  useEffect(() => {
    const canvas = bgRef.current;
    if (!canvas) return;

    canvas.width = 4000;
    canvas.height = 4000;
    generateImg(canvas);
  }, []);

  return (
    <>
      {/* Fixed full-viewport background canvas — blurred, behind everything */}
      <canvas id="bg-canvas" ref={bgRef} role="img" aria-label="Generative background art" />

      <div className="container">
        <Header />

        <Hero />

        <main>
          <section className="projects-section">
            <h2 className="section-title">My Projects</h2>
            <section className="projects" id="projects">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </section>
          </section>
        </main>

        <Skills />

        <section id="contact">
          <h2 className="section-title">Contact Me</h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
