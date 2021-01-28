#!/bin/bash
#Author: Balaji Pachai
#Date Created: 29/01/2021

sudo apt update
sudo apt install nginx
sudo ufw app list
sudo ufw allow 'Nginx HTTP'
sudo ufw status
systemctl status nginx

echo "Execute below commands sequentially"

echo "1. sudo mkdir -p /var/www/{{directory_name}}"
echo "2. sudo chown -R $USER:$USER /var/www/{{directory_name}}/"
echo "3. sudo chmod -R 755 /var/www/{{directory_name}}/"
echo "4. sudo vi /etc/nginx/sites-available/{{directory_name}}"
echo "5. sudo ln -s /etc/nginx/sites-available/{{directory_name}} /etc/nginx/sites-enabled/"
echo "6. sudo nano /etc/nginx/nginx.conf"
echo "7. sudo nginx -t"

sleep 10
