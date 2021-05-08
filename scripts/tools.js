module.exports = {
    checkPerm: (message, perm) =>{return message.member.hasPermission(perm);},
    parseMessage: (message) =>{return message.content.split(' ')[1];},
    sleep:  (time) =>{return new Promise((resolve) => setTimeout(resolve, time));}
};