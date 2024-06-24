FROM node:22-alpine

WORKDIR /app
ARG NODE_ENV=production
COPY package*.json .
RUN npm install
COPY ./src .

CMD ["node", "index.js"]
