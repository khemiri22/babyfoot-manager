FROM node:20-alpine

WORKDIR /babyfoot-manager

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

ENTRYPOINT ["node", "server.js"]

EXPOSE 4000

