#!/bin/bash

xset -dpms
xset s off

openbox-session &
chromium --start-fullscreen --kiosk --incognito --no-first-run --noerrdialogs --disable-translate --disable-features=Translate --disable-infobars 'http://10.10.1.1:8080/'
