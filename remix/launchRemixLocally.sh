#!/bin/bash

# Author: Balaji Shetty Pachai
# Script Details:
	# To run solidity online compiler locally and load smart contract's directory inside the offline version
	# https://remix.ethereum.org/

# Step 1
# Install remix-ide

if [ $# -eq 2  ]
then
npm install remix-ide -g
remix-ide $1
fi

if [ $# -lt 1  ]
then
	echo "Please provide the contract's directory path that has to be loaded in offline solidity compiler"
else 
remix-ide $1
fi

# Usage 

# If you want to install and then load say XYZ contracts into the offline version of solidity compiler
# Prior to invoking this script, you should make it executable

# chmod ugo+x launchRemixLocally.sh

# Invoke
# ./launchRemixLocally.sh 'Path/to/contract/directory' installAndRun


# If you have already downloaded the remix-ide in that case invoke this script with 2 parameters

# Invoke
#./launchRemixLocally.sh 'Path/to/contract/directory'

# Why to do this, go throuogh this blog, it will give you a clear idea about the why part?
# https://medium.com/authereum/debugging-solidity-with-a-gui-remix-and-ganache-c6c16488fcfd
