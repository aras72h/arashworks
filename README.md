# Arash Abolhasani - Portfolio

Personal portfolio website showcasing projects and skills.

**Live Site:** https://arashworks.ir

---

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** CSS3
- **Canvas Art:** Custom generative art background
- **Contact Form:** nodemailer + Self-hosted mail server
- **Deployment:** Docker + Nginx

---

## Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
npm install
npm run dev
```

Open http://localhost:7780

### Generate OG Image

```bash
npm run generate:og
```

---

## Production Build

### Local Build

```bash
npm run build
npm run preview
```

### Docker Build

```bash
docker build -t arashworks:latest .
docker run -p 7780:80 arashworks:latest
```

Open http://localhost:7780

---

### Project Structure

```
portfolio/
├── packages/
│   └── image-gen/          # Canvas generative art package
├── src/
│   ├── components/         # React components
│   ├── data/               # Static data (projects.js)
│   ├── hooks/              # Custom hooks
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── public/
│   └── 404.html            # GitHub Pages redirect
├── scripts/
│   └── generate-og.js      # OG image generator
├── index.html
├── vite.config.js
├── Dockerfile
└── nginx.conf
```

## GitHub Secrets to add

- Go to repository Settings → Secrets and variables → Actions
- Add secret: `VITE_API_URL` (value: `https://api.sedaat.ir` for production)
- Add secret: `REGISTRY_USERNAME` (Docker registry username)
- Add secret: `REGISTRY_PASSWORD` (Docker registry password)
- Add secret: `DEPLOY_HOST` (Production server IP or hostname)
- Add secret: `DEPLOY_USER` (SSH username for deployment)
- Add secret: `DEPLOY_SSH_KEY` (Private SSH key for deployment)

## License

MIT © Arash Abolhasani
