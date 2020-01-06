#!/bin/bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot # 載入 certbot 的 ppa
sudo apt-get update # 更新 apt-get
sudo apt-get install python-certbot-nginx # 安裝 python 的 certbot for nginx
sudo certbot --nginx -d yunli-design.com
