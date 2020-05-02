#!/bin/bash

set -e

cd "${BASH_SOURCE%/*}"

yarn
yarn build
rm -rf dist
mkdir dist
cd dist
cp ../package.json .
yarn --production
zip -r ../dist.zip .

