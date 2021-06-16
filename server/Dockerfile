# https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f

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