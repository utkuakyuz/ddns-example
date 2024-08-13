FROM node:14 AS react-vite-builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Debugging command to list contents of /app directory
RUN ls -la /app

FROM nginx:alpine

# Copy the built files from the react-vite-builder stage
COPY --from=react-vite-builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]