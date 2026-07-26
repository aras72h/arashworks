# =========================================
# Stage 1: Build the React.js Application
# =========================================
ARG NODE_VERSION=24.12.0-slim
ARG NGINX_VERSION=alpine3.22

FROM node:${NODE_VERSION} AS builder

# Build-time environment variables
ARG VITE_API_URL=https://api.sedaat.ir
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

# Copy root workspace manifests for npm ci
COPY package.json package-lock.json* ./

# Copy workspace package.json files so npm can resolve the @sedaat/image-gen workspace dep
COPY packages/image-gen/package.json ./packages/image-gen/

# Install dependencies
# --omit=dev skips canvas (only needed for generate:og script, not the Vite build)
RUN npm ci

# Explicitly install the Linux x64 rollup native binary.
# Windows-generated lockfiles omit Linux optional deps — this patches it at build time.
RUN npm install --no-save --ignore-scripts @rollup/rollup-linux-x64-gnu

# Copy source code (portfolio app at root + shared image-gen package)
COPY src/ ./src/
COPY public/ ./public/
COPY index.html vite.config.js ./
COPY packages/image-gen/ ./packages/image-gen/

# Build the React app (outputs to /app/dist)
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner

# Copy nginx config from root
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage (dist already contains everything from public/)
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

USER nginx

EXPOSE 80

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
