const DS = require('discord.js');
const CFG = require('./config/config.json');
let bot = new DS.Client();
let prefix = '.';

//let tools = require('./scripts/tools');
let mute = require('./scripts/mute').mute;

bot.on("message", (message)=>{
    if(!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    let command = message.content.slice(prefix.length).split(' ').shift().toLowerCase();
    switch(command){
        case "alive":
            message.channel.send("Je suis là").catch();
            break;
        case "mute":
            mute(message);
            break;
        case "ping":
            message.channel.send(`Pong! You had a ping of ${Date.now() - message.createdTimestamp}ms.`).catch();
            break;
        default:
            message.channel.send("Je suis désolé mais j'ai du éternué pendant que je lisais, " +
                "pouvez vous répéter (error cmd not recognized)").catch();
            break;
    }
});
bot.on("ready", ()=>{
    console.log("BipBup is now ready.")
});
bot.login(CFG.BOT_TOKEN).then(()=>{console.log("... connected")});