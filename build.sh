#/bin/bash

# ensure dist dir exists
mkdir -p ./dist

# clean if not empty
rm -rf ./dist/*

# api
cp -a ./api ./dist/api
rm ./dist/api/.env

# ui
cd ./ui
npm run build >/dev/null
cd ..
cp -a ./ui/dist ./dist/ui

# conf
cp -a ./conf ./dist/conf

# setup
cp -a ./setup.sh ./dist/setup.sh

# UI start
cp -a ./start-ui.sh ./dist/start-ui.sh
