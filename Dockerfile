FROM node:18

WORKDIR /app

ENV CGO_ENABLED=0
ENV GOOS=linux

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

RUN npm install wait-for

# CMD ["node", "dist/index.js"]
CMD sh -c 'node dist/index.js & npm exec wait-on http://localhost:3001 && mocha --require dist/**/*.test.js'
