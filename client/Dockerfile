#  setting env while running container - https://vsupalov.com/docker-env-vars/
FROM node:16.3.0-alpine

ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_SERVER_URL
ARG REACT_APP_WS_URL

ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}
ENV REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL}
ENV REACT_APP_WS_URL=${REACT_APP_WS_URL}

RUN echo "$REACT_APP_GOOGLE_CLIENT_ID"
RUN echo "$REACT_APP_SERVER_URL"
RUN echo "$REACT_APP_WS_URL"


WORKDIR '/app'
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# using nginx for serving static html
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]