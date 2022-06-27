#!/bin/bash
echo "Install nodejs"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - 
sudo apt-get update && sudo apt upgrade -y
sudo apt-get install -y nodejs
