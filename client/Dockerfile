FROM node:lts

RUN mkdir -p /opt/client
WORKDIR /opt/client

COPY . .

RUN npm i -g @angular/cli@10.2.1

RUN npm install

ENTRYPOINT ng serve --host 0.0.0.0 --disableHostCheck