# Ticcsbot

## How to use:

Download or clone repo into folder. 

Edit .env file

```.env
PREFIX=botprefix(!)
BOTNAME=Botsusername
TOKEN=Botstoken
CHANNEL=ChannelToJoin
ID=BotId
GOOGLE_APPLICATION_CREDENTIALS=./secrets/key.json
```

Get google application credentials and put it in `./secrets/key.json`:

`1. go to https://console.cloud.google.com/`

`2. After login go to this link: https://console.cloud.google.com/apis/credentials`

`3. Click create credentials and create the key.`

After downloading the json file put it in `./secrets/` in your project root directory and name the file key.json

# DO NOT show this to someone or publis this file to github

after this open a terminal in vs code and run:
 ```cmd
1.  npm run install
2.  npm run start
```