FROM node:6-alpine
ENV NODE_ENV development
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install
COPY . .
EXPOSE 1234
CMD ["npm", "run", "dev"]