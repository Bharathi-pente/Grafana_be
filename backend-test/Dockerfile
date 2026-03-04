FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy app source
COPY . .

EXPOSE 3000

# Default environment variables (can be overridden at runtime)
ENV PORT=3000
ENV SERVICE_NAME=node-test-service
ENV OTEL_COLLECTOR_ENDPOINT=http://otel-collector:4318/v1/logs

CMD ["node", "server.js"]
