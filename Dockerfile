FROM node:14.17.5

RUN mkdir -p /usr/app/

WORKDIR /usr/app

COPY ./ ./

RUN yarn install

run yarn build

EXPOSE 3000

CMD ["yarn", "start"]