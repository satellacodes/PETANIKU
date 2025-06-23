FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate
ENV NODE_ENV=production
CMD ["node", "src/index.js"]

