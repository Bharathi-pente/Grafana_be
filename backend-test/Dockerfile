FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV SERVICE_NAME=node-test-service
ENV OTEL_COLLECTOR_ENDPOINT=http://host.docker.internal:3100/loki/api/v1/push

CMD ["node", "server.js"]