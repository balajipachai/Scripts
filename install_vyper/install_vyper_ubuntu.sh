#!/bin/bash
#Author: Balaji Pachai
#Date Created: 05/07/2019

#Vyper is a contract-oriented, pythonic programming language that targets the Ethereum Virtual Machine (EVM).
#Script to install vyper

ubuntuXenialXerus=16.04
ubuntuVersion=`lsb_release -rs`

function resetEchoColor() {
    echo -e "\e[0m"
}

echo -e "\n\e[33mInstalling Pre-requisites..."

#Function to install pre-requisites for Vyper on Ubuntu 16.04 or older
function installPreReqsForVyperOnXenialXerusOrOlder() {
    echo -e "\n\e[34mBeginning installations on ubuntu $1..."
    resetEchoColor
    #Start by making sure your packages are up-to date
    sudo apt-get update
    sudo apt-get -y upgrade
    #Install Python 3.6 and some necessary packages
    sudo apt-get install build-essential libssl-dev libffi-dev
    wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tgz
    tar xfz Python-3.6.2.tgz
    cd Python-3.6.2/
    ./configure --prefix /usr/local/lib/python3.6
    sudo make
    sudo make install
    echo -e "\n\e[32mInstalled pre-requisites successfully"
    resetEchoColor
}

#Function to install pre-requisites for Vyper on Ubuntu 16.10 and newer
function installPreReqsForVyperOnAboveXenialXerus() {
    echo -e "\n\e[34mBeginning installations on ubuntu $1..."
    resetEchoColor
    sudo apt-get update
    sudo apt-get install -y python3.6
    echo -e "\n\e[34mInstallation to avoid the error Python.h: No such file or directory"
    resetEchoColor
    sudo apt-get install -y python3-dev
    echo -e "\n\e[32mInstalled pre-requisites successfully"
    resetEchoColor
}

#Function that creates a virtual environment
function createVirtualEnv() {
    echo -e "\n\e[34mCreating a virtual environment for vyper..."
    resetEchoColor
    sudo apt-get install -y virtualenv
    virtualenv -p python3.6 --no-site-packages ~/vyper-venv
    source ~/vyper-venv/bin/activate
    echo -e "\n\e[32mVirtual environment created successfully."
    resetEchoColor
}

#Function that installs vyper
function installVyper() {
    git clone https://github.com/ethereum/vyper.git
    cd vyper
    make
    make test
    echo -e "\e[32mVyper Installed successfully."
    resetEchoColor
}

#Installation of Pre-requisites
if (( $(echo "$ubuntuVersion <= $ubuntuXenialXerus" | bc -l) )); then
    installPreReqsForVyperOnXenialXerusOrOlder "$ubuntuVersion"
    createVirtualEnv
#    installVyper
    elif (( $(echo "$ubuntuVersion >= 16.10" | bc -l) )); then
        installPreReqsForVyperOnAboveXenialXerus "$ubuntuVersion"
        createVirtualEnv
#        installVyper
fi

#This script has been created by referring the commands on Vyper: Read the docs official page's Installing Vyper section
#https://vyper.readthedocs.io/en/latest/installing-vyper.html


