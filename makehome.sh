#!/bin/bash
sudo apt install -y vim zsh git curl transport-https build-essential python3-pip gnupg software-properties-common
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - 
sudo apt-get update && sudo apt-get install -y terraform nodejs && sudo apt upgrade -y
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
cp -r ./.oh-my-zsh/ ~
cp ./.zshrc ~
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
exec zsh
