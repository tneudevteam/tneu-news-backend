#!/usr/bin/env bash

yarn test
yarn build

mkdir -p .build

cp -r lib/ .build/
cp package.json .build/package.json
cp .yarnclean .build/.yarnclean
cp yarn.lock .build/yarn.lock

cd .build
yarn --production
du -sh ./node_modules
cd ..
