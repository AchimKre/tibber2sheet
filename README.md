# install node 
```
mkdir /opt/node
cd /opt/node
curl -O https://unofficial-builds.nodejs.org/download/release/v18.9.1/node-v18.9.1-linux-armv6l.tar.gz
tar -xvzf node-v18.9.1-linux-armv6l.tar.gz 
```
# check node installation
```
/opt/node/nodejs/node-v18.9.1-linux-armv6l/bin/node -v
/opt/node/nodejs/node-v18.9.1-linux-armv6l/bin/npm -v
```
# Git clone 
```
git clone git@github.com:AchimKre/tibber2sheet.git
```
# set config
```
vi tibber2sheet/.env
```

# set cron
```
0 * * * * PATH=/opt/node/nodejs/node-v18.9.1-linux-armv6l/bin:$PATH && node tibber2sheet/tibber2sheet.js
```