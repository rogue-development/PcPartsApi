FROM node:15

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production

COPY prod/ ./
COPY .env ./

EXPOSE 4000
EXPOSE 4001

CMD ["node", "app.js"]
