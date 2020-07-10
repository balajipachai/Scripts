#!/bin/bash
sudo /etc/init.d/mysql stop 
sudo mkdir -p /var/run/mysqld 
sudo chown mysql:mysql /var/run/mysqld 
sudo chmod 777 /var/run/mysqld/mysqld.sock 
sudo mysqld_safe --skip-grant-tables &
