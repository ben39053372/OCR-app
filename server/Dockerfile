# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "build/index.js"]