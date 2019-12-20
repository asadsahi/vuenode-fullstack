# Client App
FROM node:12.13.1-alpine
LABEL authors="Asad Sahi"
WORKDIR /usr/src/app
RUN npm install --silent -g nodemon cross-env concurrently
COPY package.json .
RUN npm install --silent
COPY . .
RUN npm run db

EXPOSE 5050
EXPOSE 5051
EXPOSE 9229
