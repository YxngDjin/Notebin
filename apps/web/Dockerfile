FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/typescript-config/package*.json ./packages/typescript-config/
COPY packages/eslint-config/package*.json ./packages/eslint-config/
COPY packages/ui/package*.json ./packages/ui/

RUN npm install --workspaces

COPY apps/web ./apps/web
COPY packages ./packages

WORKDIR /app/apps/web

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]