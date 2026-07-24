/**
 * Static project data — matches the original CV repo (index.js) exactly.
 * Shape: { id, title, description, techStack[], links[{ name, url }] }
 */
const projects = [
  {
    id: 1,
    title: 'Sedaat',
    description:
      'A full-stack Persian (RTL) blog and content management system with AI-powered content generation. Features include AI-assisted blog writing (topic generation, outline creation, full post generation), real-time analytics dashboard, user authentication with role-based access control, markdown editing, SEO optimization with sitemap and robots.txt, bot detection for search engine crawlers, and a custom admin panel built with React Admin. Built with a microservices architecture including separate frontend, admin panel, API backend, and documentation site.',
    techStack: ['React', 'TypeScript', 'JavaScript', 'Express.js', 'PostgreSQL', 'Sequelize ORM', 'Docker', 'Vite', 'TanStack Router', 'React Query', 'JWT', 'AI Integration', 'Nginx'],
    links: [
      { name: 'Live Demo', url: 'https://sedaat.ir' },
    ],
  },
  {
    id: 2,
    title: 'Music Brief',
    description:
      "Creating a music project or composing a song involves countless decisions, and our capacity to make good decisions each day is limited. That's where Music Brief comes in! This project helps kickstart your music-making process by generating randomized starting points for your creative journey. With Music Brief, you'll get a name, tempo, musical scale, arrangement, deadline, and more—all at the click of a button. Plus, you can easily export your generated ideas as a PDF, so you're ready to dive straight into creating.",
    techStack: ['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Vercel'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/music-brief-react' },
      { name: 'Live Demo', url: 'https://music-brief-react.vercel.app/' },
    ],
  },
  {
    id: 3,
    title: 'Notes RESTful API',
    description:
      'A Note-Taking API built with Node.js, Express, Sequelize, and PostgreSQL. It supports user registration, authentication, and CRUD operations for notes, notebooks, and tags. Features secure password hashing with bcrypt and JWT for authentication.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/notes-api' },
    ],
  },
  {
    id: 4,
    title: 'Blog RESTful API',
    description:
      'A Blog API built with Node.js, Express, Sequelize, and PostgreSQL. It supports user registration, authentication, and CRUD operations for blog posts, and likes. Features secure password hashing with bcrypt and JWT for authentication.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/simple-blog-api' },
    ],
  },
  {
    id: 5,
    title: 'Authentication RESTful API',
    description:
      'This is a user authentication API built with Node.js, Express, and Sequelize. It allows users to register, log in, update their information, delete their accounts, and manage password recovery.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/auth-api' },
    ],
  },
  {
    id: 6,
    title: 'Responsive Web Page',
    description:
      'Responsive page showcasing information about Roger Linn, the renowned designer of electronic music products.',
    techStack: ['HTML', 'CSS', 'Modular Scale'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/roger-linn' },
      { name: 'Live Demo', url: 'https://aras72h.github.io/roger-linn/' },
    ],
  },
  {
    id: 7,
    title: 'Interactive Rating Component',
    description: 'Interactive and Responsive rating component',
    techStack: ['HTML', 'CSS', 'Modular Scale', 'JavaScript'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/interactive-rating-component' },
      { name: 'Live Demo', url: 'https://aras72h.github.io/interactive-rating-component/' },
    ],
  },
  {
    id: 8,
    title: 'To-Do API',
    description:
      'RESTful API for managing tasks and lists, built with Node.js, Express, and PostgreSQL. Features user authentication with JWT, and supports CRUD operations for tasks and lists.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/todo-api' },
    ],
  },
];

export default projects;
