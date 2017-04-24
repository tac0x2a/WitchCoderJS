
# Base Settings
FROM node:7.9.0-alpine
MAINTAINER TAC tac0x2a

# Make devenv
WORKDIR /home/devenv
ENV HOME /home/devenv

# Application Volumes
RUN mkdir /home/devenv/witchcoder
VOLUME /home/devenv/witchcoder

# Install docker
RUN apk update && apk add docker=1.11.2-r1 --no-cache

# Run Application
ENTRYPOINT cd /home/devenv/witchcoder/docker-judge && \
           ash ./build.sh && \
           cd /home/devenv/witchcoder && \
           npm install && npm start
