# backend/Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Compile TypeScript to JavaScript
RUN npm run build

CMD ["npm", "start"]