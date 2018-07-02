const Discord = require('discord.js')
const bot = new Discord.Client()
const Doc = require('./doc.js')
// import {Doc} from './doc.js';
var doc;

bot.on('ready', function () {
  console.log("Ready to dominate")

  doc = new Doc(bot);
  doc.randomShowUp(); // RIP the once in a while
  doc.checkLive(bot);

})

bot.login('NDMxODQ4MzQwOTgxMDIyNzIw.Da6leQ.YvsgKae_nW7xBKO9dOO210AbBc8')

bot.on('message', message => {

  switch(message.content){

    case 'doc, speak':
      message.channel.send("You are the best", {tts: true})
      break

    case 'doc, come to me':
      doc.joinFirstVchannel()
      break

    case 'get your trophies':
      doc.leave()
      break;

  }

  switch (true) {

      //text

      case /<:Msmile:428299610272956430>/.test(message.content):
        message.channel.send("Did you miss me ?", {tts: true})
        break;

      case /<:top1:427923720481275904>/.test(message.content):
        message.channel.send("Well done kids", {tts: true})
        break;

      case /wtf/i.test(message.content):
        message.channel.send("<:wat:336130868869332994>")
        break;

      case /(doc\s|)\u003C\u0040(\d+)\u003E(\s+)is\s(raging|salty|gonna\srage\squit)/i.test(message.content):
      // détecte l'id d'une personne mentionnée
        var id = /\u003C\u0040(\w+)\u003E/.exec(message.content)
        message.channel.send("Come on " + id[0] + " get yourself together !\rhttps://imgur.com/a/JIi3V")
        break;

      //functions

      case /mdr|lol|ptdr|xD|x\)|riz|drole|<:lol:431951388751298561>|<:noel:416549332205043712>/i.test(message.content):
        //doc.laughing(message)
        message.channel.send("<:lul:422532691817136203>")
        break;

      case /(f(u+|)ck\s(u|you)|sh(i+)t|m(e+)rde|d(a+)mn|prick|ptn|race|batard|bite|tg|pd|con\b|abruti|stfu|salope|gay|pute|cunt|encul(\u00E9|e))\sdoc/i.test(message.content):
        doc.respect(message)
        break;

      case /doc\show\sto\sfortnite/i.test(message.content):
        doc.howToFortnite(message)
        break;

      case /f(u+|)ck|sh(i+)t|m(e+)rde|d(a+)mn|prick|ptn|race|batard|bite|tg|pd|con\b|abruti|stfu|salope|gay|pute|cunt|encul(\u00E9|e)/i.test(message.content):
        doc.watchYourMouth(message)
        break;

      case /r(a+)(u+)l/i.test(message.content):
        doc.rAUUL()
        break;

      case /banger/i.test(message.content):
        doc.banger(message)
        break;

      // case /(sorry|sry|désol(\u00E9|e))\sdoc/i.test(message.content):
      //   doc.sorry()
      //   break;

      case /(doc\s|)(i\u0027m|im|he\sis|he\u0027s|hes)\s(stressed|worried|crying)/i.test(message.content):
        doc.noWorries()
        break;

      case /doc\su\sgood/i.test(message.content):
        doc.imGood()
        break;

      case /doc\swho\sare\syou/i.test(message.content):
        message.reply("I'm the 6 foot 8 1993 1994 blockbuster videogame champion.")
        doc.whoAmI()
        break;

      case /gi(l+)e(t+)e/i.test(message.content):
        doc.gilette()
        break;

      //préfixes

      case message.content.startsWith('$tip'):
        doc.tip(message)
        break;

      case message.content.startsWith('doc'):
        doc.bangerPlayer(message)
        break;

      //replies

      case /(hey|hi)\s(dr|doc)/i.test(message.content):
        message.reply("Hello Champion looking great today ?")
        break;

      case /dormir|night|nuit/i.test(message.content):
        message.reply("Sleep tight champion <:sleep:413097431425875978>")
        break;

      case /(thx|thanks|merci)\sdoc/i.test(message.content):
        message.reply("You're welcome kiddo\r https://imgur.com/a/xvc4n")
        break;

    }
})
