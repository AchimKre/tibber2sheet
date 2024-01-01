The script reads the electricity meter (consumption & production) via the Tibber Pulse / Tibber API and sends it to a Google Form.

# install node 
You can install node using package manager or official packages. If you want to run it on a raspberry pi zero, then you have to install node from an unofficial source:
```
mkdir -p/opt/node
cd /opt/node
curl -O https://unofficial-builds.nodejs.org/download/release/v20.10.0/node-v20.10.0-linux-armv6l.tar.gz
tar -xvzf node-v20.10.0-linux-armv6l.tar.gz
```

Check the node installation:
```
/opt/node/node-v20.10.0-linux-armv6l/bin/node -v
```

# Git clone 
```
git clone https://github.com/AchimKre/tibber2sheet.git
```
# set build and config
```
PATH=/opt/node/node-v20.10.0-linux-armv6l/bin:$PATH
cd tibber2sheet
npm i
vi tibber2sheet/.env
# test
node tibber2sheet.js
```

# set cron
```
PATH=/opt/node/node-v20.10.0-linux-armv6l/bin:$PATH && cd tibber2sheet && node tibber2sheet.js
```