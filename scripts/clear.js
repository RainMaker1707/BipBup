let tools = require('./tools');
let CFG = require('../config/config');

module.exports = (message)=>{
  async function clear(nbr){
      message.delete();
      const fetched = await message.channel.messages.fetch({limit: nbr+1});
      message.channel.bulkDelete(fetched).catch();
  }
  if(tools.checkPerm(message, "KICK_MEMBERS")){
      let cnt =  message.content.slice(CFG.PREFIX.length).trim().split(' ');
      cnt.shift();
      console.log(parseInt(cnt[0]) <= 100);
      if(!cnt[0]) {
          clear(25).catch();
      }else if (parseInt(cnt[0]) <= 100) {
          console.log(cnt[0]);
          clear(parseInt(cnt[0])).catch();
      } else tools.answer(message, "Vous pouvez supprimez 100 messages maximum");
  }else tools.answer(message, "Vous n'avez pas la permission de supprimer des messages");
};