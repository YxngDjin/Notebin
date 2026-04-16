FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["sh", "-c", "npx drizzle-kit migrate && node dist/index.js"]