# Dockerfile

# Stage 1 - Build Angular App
FROM node:18 as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Create a lightweight image with just the built app
FROM nginx:1.21.1-alpine

COPY --from=build /usr/src/app/dist/angular-frontend /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
