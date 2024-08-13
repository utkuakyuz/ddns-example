FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PGHOST=postgres
ENV PGUSER=postgres
ENV PGDATABASE=postgres
ENV PGPASSWORD=123456
ENV PGPORT=5432

EXPOSE 8080

CMD ["node", "app.js"]
