# Client App
FROM node:12.13.1-alpine
LABEL authors="Asad Sahi"
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --silent -g nodemon cross-env
RUN npm install --silent
COPY . .
RUN npm run db
RUN npm run build

EXPOSE 5050

CMD ["npm", "run", "start"]