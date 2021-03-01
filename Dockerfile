FROM node:14.15.4

ENV mysqlbdport=;3306
ENV mysqlbdip=localhost
ENV mysqlbdusr=user1
ENV mysqlbdpsw=Qwer123!
ENV mysqlbdschema=ach2
ENV mysqlbdconnectLimit=10

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
