FROM node
WORKDIR /usr/app
COPY package.json .
RUN npm config set legacy-peer-deps true
RUN npm install
COPY . .