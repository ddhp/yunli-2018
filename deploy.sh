#!/bin/bash
git fetch
git checkout master
git pull origin master

sudo ln -sf "${PWD}/yunli-2018.conf" /etc/nginx/sites-available/yunli-2018.conf
sudo ln -sf /etc/nginx/sites-available/yunli-2018.conf /etc/nginx/sites-enabled/yunli-2018.conf
sudo nginx -s reload

yarn
yarn build:browser:prod
yarn build:server:prod
pm2 start pm2.config.js --env production
