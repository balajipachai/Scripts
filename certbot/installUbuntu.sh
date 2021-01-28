#!/bin/bash
#Author: Balaji Pachai
#Date Created: 29/01/2021

echo "Installing certbot..."
sleep 2
sudo snap install --classic certbot
echo "Creating symbolic link for certbot..."
sleep 2
sudo ln -s /snap/bin/certbot /usr/bin/certbot
echo "Configuring certbot for nginx hosted app"
sudo certbot --nginx