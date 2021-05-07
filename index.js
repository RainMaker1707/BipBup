const DS = require('discord.js');
const CFG = require('./config/config.json');
let bot = new DS.Client();
let cmd = '.';

bot.on("message", (message)=>{

});
let prom = bot.login(CFG.BOT_TOKEN);
if(prom !== undefined) console.log("connected");