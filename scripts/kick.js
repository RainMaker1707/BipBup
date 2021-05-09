let tools = require('./tools');
let CFG = require('../config/config');

module.exports = (message) =>{
    if(tools.checkPerm(message, 'KICK_MEMBERS')){
        let nameTag = message.mentions.members.first();
        if(nameTag){
            if(nameTag.kickable){
                let reason = message.content.slice(CFG.PREFIX.length).trim()
                            .split('[').slice(1)[0];
                console.log(reason);
                if(reason && reason.charAt(reason.length -1) === ']') reason = reason.slice(0, -1);
                nameTag.kick(reason).catch().then(()=> {
                    if(message.client.channels.cache.find((chan) => chan.name === "bot_logs")) {
                        message.client.channels.cache.find((channel) => channel.name === 'bot_logs').send(
                           "<@!"+ message.author + "> a soufflé dehors <@!" + nameTag + "> pour la raison [" + reason +
                            "] à " + new Date().toISOString()
                        );
                    }
                });
            }else tools.answer(message, "Cet personne éternue plus fort que vous, désolé!")
        }else tools.answer(message, "Il va falloir répéter, en précisant qui expulser")
    }else tools.answer(message, "Vous n'éternuez pas assez fort que pour souffler vos camarades dehors");
};