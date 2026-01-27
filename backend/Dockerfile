FROM node:18-alpine

RUN apk update && apk add  postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev
RUN npm install -g nodemon 
RUN npm install -g sequelize-cli

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]
