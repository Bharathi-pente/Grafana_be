FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

ENV PORT=4001
ENV SERVICE_NAME=customer-service
ENV OTEL_COLLECTOR_ENDPOINT=http://172.17.0.1:3100/loki/api/v1/push

CMD ["node", "server.js"]