FROM node:alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# using nginx for serving static html
FROM nginx
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html