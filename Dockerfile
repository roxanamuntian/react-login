FROM node:10.16-jessie

WORKDIR app

COPY package.json package-lock.json ./

COPY src src

COPY public public

RUN npm install

RUN npm run build

FROM nginx

COPY build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf