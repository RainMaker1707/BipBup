let tools = require('./tools');

module.exports = (message) =>{
    if(tools.checkPerm(message, "BAN_MEMBERS")){
        let victim = message.mentions.members.first();
        if(victim){
            if(victim.bannable){
                if(!victim.hasPermission("BAN_MEMBERS")) {
                    let reason = message.content.slice(CFG.PREFIX.length).trim()
                        .split(' ');
                    reason.shift();
                    reason.shift();
                    reason = reason.join(' ').trim();
                    if (reason) {
                        victim.ban({'reason': reason}).catch().then(
                            () => {
                                if (message.client.channels.cache.find((chan) => chan.name === "bot_logs")) {
                                    message.client.channels.cache.find((channel) => channel.name === 'bot_logs').send(
                                        "<@!" + message.author + "> a soufflé dehors <@!" + nameTag + "> pour la raison [ " + reason +
                                        " ] à " + new Date().toISOString()
                                    );
                                }
                            }
                        );
                    } else tools.answer(message, "Vous devez justifiez vos actions")
                }else tools.answer(message, "Vous ne pouvez pas bannir d'autres modérateurs")
            }else tools.answer(message, "Apparemment vous ne pouvez pas touchez les dieux")
        }else tools.answer(message, "Vous devez mentionnez quelqu'un")
    }else tools.answer(message, "Il faudra éternuer plus fort pour déraciner cet vieille branche")
};