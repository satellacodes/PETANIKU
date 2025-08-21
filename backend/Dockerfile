FROM node:16.20.2

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev
RUN npm install -g nodemon 
RUN npm install -g sequelize

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]
