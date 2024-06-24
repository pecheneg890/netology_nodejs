FROM node:alpine3.19

WORKDIR /app
ARG NODE_ENV=production
COPY package*.json .
RUN npm install
RUN mkdir book_storage
COPY ./src .

CMD ["node", "index.js"]
