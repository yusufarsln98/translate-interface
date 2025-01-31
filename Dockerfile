# Use Node.js LTS as base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables (Docker Compose will override these)
ARG NEXT_PUBLIC_API_KEY
ARG NEXT_PUBLIC_M2M_API_URL
ARG NEXT_PUBLIC_MODEL_URL
ARG NEXT_PUBLIC_MODEL_NAME

ENV NEXT_PUBLIC_API_KEY=$NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_M2M_API_URL=$NEXT_PUBLIC_M2M_API_URL
ENV NEXT_PUBLIC_MODEL_URL=$NEXT_PUBLIC_MODEL_URL
ENV NEXT_PUBLIC_MODEL_NAME=$NEXT_PUBLIC_MODEL_NAME

# Start the application
CMD ["npm", "start"]
