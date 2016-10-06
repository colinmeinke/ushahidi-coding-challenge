FROM mhart/alpine-node
LABEL name "ushahidi-test"
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN apk add --no-cache make gcc g++ python
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
