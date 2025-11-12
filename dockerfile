# ------------ BUILD STAGE ------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all project files
COPY . .

# Disable type/lint blocking & build
RUN npm run build

# ------------ PRODUCTION STAGE ------------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only what’s needed for production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm install --omit=dev

# Expose port (default Next.js port)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
