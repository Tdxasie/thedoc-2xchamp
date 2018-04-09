const YoutubeStream = require('ytdl-core')
const fetch = require("node-fetch");

module.exports = class Doc {

  constructor (message) {
    if(message != undefined){
      this.message = message

      this.voiceChnl = message.guild.channels
        .filter(function(channel) {return channel.type === 'voice'})
        .first()

    } else {
      console.log("message not defined")
    }
  }

  playVideo (url) {
    this.voiceChnl.join()
      .then(function(connection) {
        connection
          .playStream(YoutubeStream(url))
          .on('end', function () {
            connection.disconnect()
          })
      })
  }

  joinFirstVchannel () {
    var message = this.message;
    this.voiceChnl.join()
      .then(function() {
          message.channel.send("I'm here, feel my breath over your neck", {tts: true})
      })
  }

  leave () {
    this.voiceChnl.leave()
  }

  noWorries () {
    this.playVideo('https://youtu.be/UbHIViE3pRE')
  }

  rAUUL () {
    var rauuls = ["https://youtu.be/Y9-vGdWLg7w",
                  "https://youtu.be/W3g9PyUDPxg",
                  "https://youtu.be/TQgeO6GaPLo",
                  "https://youtu.be/yx4xD8qV1cE",
                  "https://youtu.be/QlI6YKDkGTE",
                  "https://youtu.be/G38f8W_wykI",
                  "https://youtu.be/dp1zjoJyGGQ",
                  "https://youtu.be/P-zYLG-lSVs",
                  "https://youtu.be/8cykZRS9yZ8",
                  "https://youtu.be/UyIXuv3PO50"];

    var random = Math.floor(Math.random() * 10);
    this.playVideo(rauuls[random]);
  }

  tip () {
    var message = this.message;
    let args = message.content.split(' ')
    let val = args[1];

    switch(true) {
      case (val < 1):
        message.reply("<:lul:422532691817136203>");
        break
      case (val == 1):
        message.reply("How dare you give me one dollar ?! <:lul:422532691817136203>");
        break
      case (val > 1 && val < 200):
        message.reply("Thank you for the "+val+" $ donation");
        break
      case (val >= 200 && val != 600):
        message.reply("ARE YOU INSANE ?! "+val+"$ ??");
        break
      case (val == 600):
        this.playVideo("https://youtu.be/duHPA2Tyu2M");
        break
      }
    }

    randomShowUp(){
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async function callTheDoc(theDoc) {

        var random = Math.floor((Math.random() * 121) + 30);

        await sleep(random*60*1000);

        if(Math.floor((Math.random() * 10) + 1) == 1){

          console.log("Doc really loves being the best");
          theDoc.playVideo("https://youtu.be/F_ZcIjjfh4A")

        } else {

          console.log("Doc loves being the best");
          theDoc.playVideo("https://youtu.be/bhyBsKnGTZI")

        }

        callTheDoc(theDoc);
      }

      callTheDoc(this);
    }

    checkLive(bot) {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      var liveDoc = true;
      async function checkDocStream(message,bot){
        fetch('https://api.twitch.tv/kraken/streams/drdisrespectlive?client_id=vnu4gzd7h2dasngmfkldwc1aapw2xm')
        .then((response) => response.json())
          .then((data) => {
            if(data["stream"] === null){

              liveDoc = false
              bot.user.setActivity('ses Trophées', { type: 'WATCHING' })
              //console.log("It's a god damn snooze fest in there")

            }
            else{

              if(!liveDoc){
                liveDoc = true
                // message.channel.send("The Arena is wide open with "+data["stream"].game+" !", {tts: true})  '"+data["stream"]["channel"].status+"'
                // var mess = " -- "+data["stream"]["channel"].status+" -- \r    Playing : "+data["stream"].game+"\r    Champions : "+data["stream"].viewers*1000+"\r---------------------------------"
                message.channel.send("The Arena is WIDE open ! "+data["stream"].viewers*1000+" Champions !\r => https://www.twitch.tv/drdisrespectlive")
                bot.user.setActivity(data["stream"].game, {type: "STREAMING"})
                console.log("The Arena is wide open !")
              }

            }

          });
          await sleep(1000*120);
          checkDocStream(message,bot);
        }
        var liveZerator = false
        async function checkZeratorStream(message){
          fetch('https://api.twitch.tv/kraken/streams/zerator?client_id=vnu4gzd7h2dasngmfkldwc1aapw2xm')
            .then((response) => response.json())
              .then((data) => {
                if(data["stream"] === null){
                  liveZerator = false
                  //console.log("Zerator not live")
                }
                else{

                  if(!liveZerator){
                    liveZerator = true
                    message.channel.send("A little french streamer is live ! He is playing "+data["stream"].game+"\r => https://www.twitch.tv/zerator")
                    console.log("Zerator is live")
                  }

                }

              });
            await sleep(1000*120);
            checkZeratorStream(message);
          }
        checkDocStream(this.message,bot);
        checkZeratorStream(this.message);
      }


  }
