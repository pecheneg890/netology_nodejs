FROM node:alpine3.19

WORKDIR /app
ARG NODE_ENV=production
COPY package*.json .
RUN npm install
COPY ./src .

CMD ["node", "index.js"]
