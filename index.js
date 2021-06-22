const DS = require('discord.js');
const CFG = require('./config/config.json');
let bot = new DS.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});
let prefix = CFG.PREFIX;

//let tools = require('./scripts/tools');
let clear = require('./scripts/clear');
let mute = require('./scripts/mute').mute;
let unmute = require('./scripts/unmute');
let kick = require('./scripts/kick');
let ban = require('./scripts/ban');
//let bantmp = require('./scripts/bantmp');
bot.on("messageReactionAdd", async (reaction, user)=>{
    if(reaction.partial){
        try{ await reaction.fetch()}
        catch{console.log("error"); return;} //change this error later TODO
    }
    let L = [reaction.message.id, reaction.emoji.name];
    if(L[0] === '856133317350653973' && L[1] === "☑️") {
        reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(
            reaction.message.guild.roles.cache.find(role => role.name === "member"))
            .catch((err)=>console.log(err));
    }
    console.log(user.username, ": accepted the rules");
});

bot.on("messageReactionRemove", async (reaction, user)=>{
    if(reaction.partial) try{await reaction.fetch()} catch{console.log("error"); return;}
    let L = [reaction.message.id];
    if(L[0] === '856133317350653973') {
        reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(
            reaction.message.guild.roles.cache.find(role => role.name === "member"))
            .catch((err)=>console.log(err));
    }
    console.log(user.username, ": removed acceptation from the rules");
});

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
            message.channel.send("", {files: ["./img/chonteux.gif"]}).catch();
            break;
        case "okay":
            message.channel.send("", {files: ["./img/okay.gif"]}).catch();
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