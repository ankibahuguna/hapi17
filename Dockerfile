FROM node:latest
RUN mkdir -p /usr/src/hapi17
WORKDIR /usr/src/hapi17
COPY package.json /usr/src/hapi17/
RUN npm install
COPY . /usr/src/hapi17
EXPOSE 3000
CMD ["npm","start"]