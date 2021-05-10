#!/bin/bash

echo "This script will install go v1.15.5"

echo "Get the tar file...."
sudo wget https://golang.org/dl/go1.15.5.linux-amd64.tar.gz

echo "Extract the tarball to /usr/local directory"
sudo tar -C /usr/local -xzf go1.15.5.linux-amd64.tar.gz

echo "Adds go binary path to .bashrc file"
export PATH=$PATH:/usr/local/go/bin

echo "Apply changes..."
source ~/.bashrc

echo "Check go version"
go version