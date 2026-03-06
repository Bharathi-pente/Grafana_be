FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4003

ENV PORT=4003
ENV SERVICE_NAME=user-service
ENV OTEL_COLLECTOR_ENDPOINT=http://host.docker.internal:3100/loki/api/v1/push

CMD ["node", "server.js"]