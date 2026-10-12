/**
 * Static project data.
 * Shape: { id, title, description, techStack[], links[{ name, url }] }
 */
const projects = [
  {
    id: 1,
    title: 'Next.js WordPress Starter',
    description:
      'A production-ready open-source monorepo for building headless WordPress sites with Next.js 15. Features a full Docker development environment, CI/CD pipelines, on-demand revalidation via WordPress webhooks, and a shared component library built on shadcn/ui and Tailwind CSS.',
    techStack: ['Next.js', 'TypeScript', 'WordPress', 'Turborepo', 'Docker', 'Tailwind CSS', 'shadcn/ui', 'pnpm'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/nextjs-wordpress-starter' },
      { name: 'Live Demo', url: 'https://nws.arashworks.ir' },
    ],
  },
  {
    id: 2,
    title: 'ArvanCloud AI Chat Tester',
    description:
      'A Next.js chat interface for testing and interacting with ArvanCloud AI API models. Supports multiple models with real-time streaming responses, token tracking, cost calculation in Iranian Toman, conversation history, and a settings panel for configuring model endpoints.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'ArvanCloud AI'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/api-chat-test-arvancloud' },
    ],
  },
  {
    id: 3,
    title: 'Whisper AI Transcription',
    description:
      'A Python script for transcribing audio and video files using OpenAI Whisper. Automatically uses NVIDIA GPU via CUDA when available and falls back to CPU. Outputs timestamped transcript segments to a text file beside each input.',
    techStack: ['Python', 'OpenAI Whisper', 'PyTorch', 'CUDA'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/whisper-ai-python' },
    ],
  },
  {
    id: 4,
    title: 'Irrigation System',
    description:
      'An automated irrigation system using Arduino with soil moisture sensing and scheduled watering cycles.',
    techStack: ['Arduino', 'C++'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/irrigation-system' },
    ],
  },
  {
    id: 5,
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
    id: 6,
    title: 'Notes RESTful API',
    description:
      'A Note-Taking API built with Node.js, Express, Sequelize, and PostgreSQL. It supports user registration, authentication, and CRUD operations for notes, notebooks, and tags. Features secure password hashing with bcrypt and JWT for authentication.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/notes-api' },
    ],
  },
  {
    id: 7,
    title: 'Blog RESTful API',
    description:
      'A Blog API built with Node.js, Express, Sequelize, and PostgreSQL. It supports user registration, authentication, and CRUD operations for blog posts, and likes. Features secure password hashing with bcrypt and JWT for authentication.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/simple-blog-api' },
    ],
  },
  {
    id: 8,
    title: 'Authentication RESTful API',
    description:
      'A user authentication API built with Node.js, Express, and Sequelize. It allows users to register, log in, update their information, delete their accounts, and manage password recovery.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/auth-api' },
    ],
  },
  {
    id: 9,
    title: 'To-Do API',
    description:
      'RESTful API for managing tasks and lists, built with Node.js, Express, and PostgreSQL. Features user authentication with JWT, and supports CRUD operations for tasks and lists.',
    techStack: ['NodeJS', 'JavaScript', 'ExpressJS', 'PostgreSQL', 'JWT Tokens', 'bcrypt', 'Sequelize ORM'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/todo-api' },
    ],
  },
  {
    id: 10,
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
    id: 11,
    title: 'Interactive Rating Component',
    description: 'Interactive and Responsive rating component',
    techStack: ['HTML', 'CSS', 'Modular Scale', 'JavaScript'],
    links: [
      { name: 'Project Repo', url: 'https://github.com/aras72h/interactive-rating-component' },
      { name: 'Live Demo', url: 'https://aras72h.github.io/interactive-rating-component/' },
    ],
  },
];

export default projects;
