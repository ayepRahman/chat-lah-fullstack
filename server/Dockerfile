# https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f
# port mapping - $docker run -p 3000:80 arifrahman88/chat-lah-client:prod 


#  Specify base image
FROM node:14.14.0-alpine as build

# Adding folder and copy in container
WORKDIR /app
COPY . .

# Install dependencies
RUN npm install
RUN npm run build

# Default command
CMD [ "npm", "start" ]