#/bin/bash

BASEDIR=$HOME/bhc
UIUSER=ui

# install dhcp server
sudo apt install isc-dhcp-server -y

# install nodejs
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# install redis
sudo apt install redis-server -y

# install requirements for browser/UI
sudo apt install chromium-browser unclutter -y

# configure network
sudo cp ./conf/netplan.conf /etc/netplan/99-bhc.conf
sudo netplan generate
sudo netplan apply
sudo cp ./conf/sysctl.conf /etc/sysctl.d/90-bhc.conf
sudo sysctl -w net.ipv4.ip_forward=1
sudo cp ./conf/dhcpd.conf /etc/dhcp/dhcpd.conf
sudo cp ./conf/isc-dhcp-server-defaults /etc/default/isc-dhcp-server

# Firewall
# prepend ./conf/ufw-before.rules to /etc/ufw/before.rules

# additional configuration
cp ./api/.env.example ./api/.env

# install pm2
sudo npm install -g pm2

# launch API and UI
cp ./conf/ecosystem.config.js ./ecosystem.config.js
sed -i -e 's|%BASEDIR%|'$BASEDIR'|g' -e 's|%USER%|'$USER'|g' ./ecosystem.config.js
pm2 start $BASEDIR/ecosystem.config.js
pm2 save

# setup API and UI start on boot
sudo env "PATH=$PATH" pm2 startup -u $USER --hp $HOME

# inject job to monitor when miner connects to exec api/bin/create-api-key.js

# create user for UI
sudo adduser --disabled-password --gecos '' $UIUSER

# setup autologin for UI user
sudo mkdir -p /etc/systemd/system/getty@tty1.service.d
sudo cp ./conf/tty-override.conf /etc/systemd/system/getty@tty1.service.d/override.conf
sed -i -e 's|%UIUSER%|'$UIUSER'|g' /etc/systemd/system/getty@tty1.service.d/override.conf
sudo systemctl daemon-reload

# set UI startup / browser launch
sudo cp -a ./start-ui.sh /home/$UIUSER/start-ui.sh
echo -e "\n\nstartx /home/$UIUSER/start-ui.sh" >> /home/$UIUSER/.profile
