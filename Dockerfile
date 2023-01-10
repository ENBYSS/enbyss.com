FROM node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 4000

CMD [ "node", "build" ]