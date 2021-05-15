const DS = require('discord.js');
const CFG = require('./config/config.json');
let bot = new DS.Client();
let prefix = CFG.PREFIX;

//let tools = require('./scripts/tools');
let clear = require('./scripts/clear');
let mute = require('./scripts/mute').mute;
let unmute = require('./scripts/unmute');
let kick = require('./scripts/kick');
let ban = require('./scripts/ban');
//let bantmp = require('./scripts/bantmp');

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
        case "unmute":
            unmute(message);
            break;
        case "kick":
            kick(message);
            break;
        case "ban":
            ban(message);
            break;
        case "clear":
            clear(message);
            break;
        case "chonteux":
            message.channel.send("", {files:
                    ["https://media1.tenor.com/images/4bdd1080e5f480864531f6f1bde9e292/tenor.gif?itemid=14793622"]})
                .catch();
            break;
        /*case "bantmp":
            bantmp(message);
            break;
         case "unban":
            unban(message)
            break;*/
        case "ping":
            message.channel.send(`Pong! You had a ping of ${Date.now() - message.createdTimestamp}ms.`).catch();
            break;
        default:
            message.channel.send("Je suis désolé mais j'ai du éternuer pendant que je lisais, " +
                "pouvez vous répéter (error cmd not recognized)").catch();
            break;
    }
});
bot.on("ready", ()=>{
    console.log("BipBup is now ready.")
});
bot.login(CFG.BOT_TOKEN).then(()=>{console.log("... connected")});