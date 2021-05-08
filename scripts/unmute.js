let tools = require('./tools');

module.exports = (message) => {
    if(tools.checkPerm(message, 'KICK_MEMBERS')){
        if(message.mentions.members.first()){
            if(message.mentions.members.first().roles.cache.some((role) => role.name === 'muted')){
                message.mentions.members.first().roles.remove(
                    message.guild.roles.cache.find(role => role.name === "muted")
                ).catch().then( ()=> {
                    message.channel.send("<@!" + message.mentions.members.first() +
                        "> est maintenant libéré de ses entraves").catch();
                });
            }else message.channel.send("Cette personne n'est pas mute...バカ").catch()
        }else message.channel.send("La commande est mal formatée: .unmute nameTag").catch()
    }else message.channel.send("Vous n'avez pas la permission d'utiliser cette commande").catch();
};