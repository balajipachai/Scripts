#!/bin/bash
#Author: Balaji Shetty Pachai
#Date Created: 06/05/2021

#Install Curl
echo -e "Installing curl\n"
sudo apt-get curl

curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
echo -e "Grants execute permission to install_nvm script\n"
chmod ugo+x install_nvm.sh
echo -e "Executes the script\n"
bash install_nvm.sh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
source ~/.profile

if [[ ${1} ]]
then
    echo -e "\nInstalling ${1} of Node.js\n"
    nvm install $1
    echo -e "\nVerifying installations\n"
    echo -e "NVM version"
    nvm --version
    echo -e "\nNode.js version"
    node -v
    echo -e "\nNPM version"
    npm -v
    echo -e "\nInstallation successful\n"
else 
    echo -e "\nSeems's you did not pass which node version? No worries we got you!"
    echo -e "1.List node versions using nvm: 'nvm ls-remote'"
    echo -e "2.Pass the node version to install script as mentioned in 'Execute the script'"
fi

#Loads the profile at the end
source ~/.profile
