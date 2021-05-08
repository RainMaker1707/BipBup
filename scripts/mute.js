let tools = require('./tools');
let sleep = tools.sleep;
let parseMessage = tools.parseMessage;
let checkPerm = tools.checkPerm;

// cmd .mute <time> <tag>
module.exports = {
    mute: (message)=>{
        if(!checkPerm(message, "KICK_MEMBERS")) {
            message.channel.send("Vous n'avez pas la permission d'effectuer cette action!").catch()
        }
        else {
            let nameTag = message.mentions.members.first();
            if (nameTag) {
                nameTag.roles.add(message.guild.roles.cache.find(role => role.name === "muted")
                ).catch((err) => {
                    console.log(err)
                }).then(() => {
                    let timeOut = parseMessage(message);
                    if(!timeOut || isNaN(timeOut) ) {
                        message.channel.send("Il manque le temps de mute dans cette commande").catch();
                        return;
                    }
                    if(Number.isInteger(timeOut)) message.channel.send("est maintenant mute pour une duré de "
                        +timeOut+" minutes").catch();
                    else message.channel.send("<@!" + nameTag + "> est maintenant mute pour une duré de "
                        +Math.trunc(timeOut)+"min "+Math.round((timeOut%1)*60)+"sec").catch();
                    sleep(timeOut * 60000).then(() => {
                        if(nameTag.roles.cache.some((role) => role.name === 'muted')) {
                            nameTag.roles.remove(message.guild.roles.cache.find(role => role.name === "muted")
                            ).catch().then(() => {
                                message.channel.send("<@!" + nameTag +
                                    "> Tu es maintenant unmute, essaie d'être plus calme a l'avenir").catch();
                            });
                        }
                    })
                });
            } else {
                message.channel.send("La commande est mal formaté, rééssaye sans éternuer!").catch();
            }
        }
    }
};