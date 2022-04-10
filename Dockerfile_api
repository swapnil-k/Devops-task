#FROM node:alpine
FROM node:14.16.1 AS node_base

RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    net-tools curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

#ENV MONGO_URI="mongodb://3.111.46.209:27017"

COPY naya-api /opt/naya-api
WORKDIR /opt/naya-api

RUN npm install --production

ENV NODE_OPTIONS="--max-old-space-size=8192"
#RUN npm run build
EXPOSE 8080

RUN node --version
RUN npm --version
# start app
CMD ["npm", "run", "start"]
