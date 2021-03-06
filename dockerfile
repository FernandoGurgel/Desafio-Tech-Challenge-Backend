FROM node:12.18.1


RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package.json ./
RUN npm install
COPY --chown=node:node dist .
USER node
EXPOSE 3333

CMD [ "node", "server.js" ]