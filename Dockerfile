FROM node:13.12.0-alpine as build
RUN apk add --no-cache bash
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
RUN apk add --no-cache bash
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]