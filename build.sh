#!/usr/bin/env bash

yarn test
yarn build

mkdir -p .build

cp -r lib/ .build/
cp package.json .build/package.json
cp .yarnclean .build/.yarnclean
cp yarn.lock .build/yarn.lock

yarn --modules-folder=.build/node_modules --production
du -sh .build/node_modules
