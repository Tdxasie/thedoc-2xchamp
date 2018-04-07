const Discord = require('discord.js')
const bot = new Discord.Client()
const Doc = require('./doc.js')
// import {Doc} from './doc.js';
var dafydoc;

bot.on('ready', function () {
  console.log("Ready to dominate")
  dafydoc = true;
})

bot.login('NDMxODQ4MzQwOTgxMDIyNzIw.DapJMg.j4V-Kx58TCDn49Iqyw3zHNXrQ1s')

bot.on('message', message => {
  // if(dafydoc){
  //   var theOnceInAWhile = new Doc(message)
  //   theOnceInAWhile.randomShowUp();
  //   theOnceInAWhile.checkLive(bot);
  //   dafydoc=false;
  // }

  var doc = new Doc(message)

  switch(message.content){

    case 'doc, speak':
      message.channel.send("You are the best", {tts: true})
      break

    case 'doc, come to me':
      doc.joinChevreuil()
      break

    case 'get your trophies':
      doc.leave()
      break

    case "doc I'm worried":
      doc.noWorries()
      break

    case "bonjour":
      message.channel.send("what ?", {tts: true})
      break

    case "raul":
      doc.rAUUL()
      break

  }

  switch (true) {
      case /<:Msmile:428299610272956430>/.test(message.content):
        message.channel.send("Did you miss me ?", {tts: true})
        break;

      case /mdr|lol|ptdr|xD|x\)|riz|<:lol:431951388751298561>|<:noel:416549332205043712>/.test(message.content):
        message.channel.send("<:lul:422532691817136203>")
        break;

      case /<:top1:427923720481275904>/.test(message.content):
        message.channel.send("Well done kids", {tts: true})
        break;

      case /wtf/.test(message.content):
        message.channel.send("<:wat:336130868869332994>")
        break;

      case (message.content.startsWith('$tip')):
        doc.tip()
        break;

      case /(thx|thanks|merci)(?=\sdoc)/.test(message.content):
        message.reply("Your welcome kiddo \r https://imgur.com/a/KEldC")
        break
    }
})





// bot.on('message', message => {
//   if (message.content === 'doc, come to me') {
//     let voiceChannel = message.guild.channels
//       .filter(function (channel) { return channel.name === 'Chevreuil' })
//       .first()
//     voiceChannel
//       .join()
//       .then(function (connection){
//         message.channel.send('/tts Im here, feel my breath over your neck')
//         connection.disconnect()
//       })
//   }
// })
