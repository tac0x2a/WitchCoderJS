# WitchCoder [![Build Status](https://travis-ci.org/tac0x2a/WitchCoder.svg?branch=master)](https://travis-ci.org/tac0x2a/WitchCoder)

WitchCoder is online judge platform.

# How to run

## For Docker
```
$ git clone git@github.com:tac0x2a/WitchCoder-devenv.git
$ cd WitchCoder-devenv
$ git clone git@github.com:tac0x2a/WitchCoder.git data/witchcoder
$ docker-compose build
$ docker-compose pull
$ docker-compose up -d
```

## For Mac
```
# Install mongo
$ brew install mongodb
$ mongod --config /usr/local/etc/mongod.conf &

$ git clone git@github.com:tac0x2a/WitchCoder.git
$ cd WitchCoder
$ npm install
$ npm start
```

then, connect docker container port 3000.


#### Thanks
icon image - http://www.sozai-library.com/sozai/5696
