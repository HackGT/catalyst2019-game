FROM node:10-alpine
MAINTAINER Ryan Petschek <petschekr@gmail.com>

# Deis wants bash
RUN apk update && apk add bash
RUN apk add git

# Bundle app source
WORKDIR /usr/src/game
COPY . /usr/src/game
RUN npm install

# Deis wants EXPOSE and CMD
EXPOSE 3000
CMD ["npm", "start"]
