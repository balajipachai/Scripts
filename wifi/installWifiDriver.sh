#!/bin/bash

#Reference link from which below commands are taken
#http://ubuntuhandbook.org/index.php/2018/08/no-wifi-adapter-found-hp-laptops-ubuntu-18-04/

#Author: Balaji Pachai
#LinkedIn: www.linkedin.com/in/balaji-pachai-blockchain-nodejs-shell-scripting-aws-deployment-microservices
#Date Created: 12/15/2018

#For Formatted Output
GREEN='\033[0;32m' #Green Color
NC='\033[0m' #No Color

echo -e "\n${GREEN}Installing wifi driver for HP Laptops...\n${NC}"
#Creates a directory get_wifi_driver and switched to that directory on Desktop
echo -e "${GREEN}Creating getWifiDriver directory on Desktop...\n${NC}"
mkdir $HOME/Desktop/get_wifi_driver
cd $HOME/Desktop/get_wifi_driver
sleep 5

#Run command to get the newest Realtek rtlwifi codes that includes rtl8192ce, rtl8192cu, rtl8192se, rtl8192de, rtl8188ee, rtl8192ee, rtl8723ae, rtl8723be, and rtl8821ae
echo -e "${GREEN}Getting the newest Realtek rtlwifi codes...\n${NC}"
git clone https://github.com/lwfinger/rtlwifi_new.git
sleep 5

#And then check out extended branch for rtl8822be or rtl8723de
echo -e "${GREEN}Checking out to extended branch for rtl8822be or rtl8723de...\n${NC}"
cd rtlwifi_new/ && git checkout origin/extended -b extended

#Install the building tools first
echo -e "${GREEN}Installing the building tools first...\n${NC}"
sudo apt-get install linux-headers-generic build-essential git
sleep 5

#Install the drivers
echo -e "${GREEN}Installing the wifi driver...\n${NC}"
echo -e "${GREEN}**************************Type your password (no asterisks feedback) when it prompts and hit Enter************************\n${NC}"
sudo make install

#If the installation success, run 2 commands load the new driver
echo -e "${GREEN}Loading the wifi driver...\n${NC}"
sudo modprobe -r rtl8723de
sudo modprobe rtl8723de
sleep 10

echo -e "${GREEN}New drivers loaded successfully\n${NC}"


