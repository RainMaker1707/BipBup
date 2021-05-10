# BipBup
Bot for Aatchouuum's discord server

## Init
It's using NPM, ensure to had already install it and use node V12 at least, then clone the repo and execute `npm init`, then install these modules.

- discord.js

Before run you need to setup the configuration file:
- add a repository 'config' on bot root
- add a file config.json in this repo with the following content:
````
{
  "BOT_TOKEN": "YOUR TOKEN HERE",
  "PREFIX": "YOUR PREFIX ie . $ !"
} 
````

## Commands
- help (not done)
- alive: juste answer with a message
- ping: answer with a message contening ping between user's client and server
- mute: (.mute [<int/float>] <nameTag>) mute the user tagged in nameTag for time specified in optional arg, if no specified muted for undefined time
- unmute: (.unmute <nameTag>) force the unmute of the user tagged
- kick: (.kick <nameTag> <string: reason> for exemple .kick @user this is a reason) kick the user specified and log the action in bot_logs channel
- ban: (.ban <nameTag> <string:reason>) ban the user specified and log the action in bot_logs channel
