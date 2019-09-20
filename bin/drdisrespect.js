const YoutubeStream = require('ytdl-core');
const fetch = require("node-fetch");
const twitch_token = require("./twitch_token.js");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let docCall;
let docIsLive;
let zeratorIsLive;
let checkIfLive;
let docGame;

async function callTheDoc(theDoc) {
    let random = Math.floor((Math.random() * 250) + 30);
    await sleep(random*60*1000);
    if(Math.floor((Math.random() * 10) + 1) === 1){
        console.log("Doc really loves being the best");
        theDoc.playVideo("https://youtu.be/F_ZcIjjfh4A", 2)
    } else {
        console.log("Doc loves being the best");
        theDoc.playVideo("https://youtu.be/bhyBsKnGTZI", 5)
    }
    if(docCall)
        await callTheDoc(theDoc);
}

async function checkDocStream(bot,textChannel){
    let status;
    let header = {
        'Client-ID': twitch_token
    };
    fetch('https://api.twitch.tv/helix/streams?user_id=17337557',{ method: 'GET', headers: header})
        .then((response) => {
            status = response.status;
            return response.json()
        })
        .then((data) => {
            if(status == 200) {
                if (data["data"].type === undefined) {

                    docIsLive = false;
                    bot.user.setActivity('ses Trophées', {type: 'WATCHING'})

                } else {

                    if (!docIsLive) {
                        docIsLive = true;
                        textChannel.send("The Arena is WIDE open ! " + data["data"].viewer_count + " milion Champions !\r => https://www.twitch.tv/drdisrespectlive")
                        bot.user.setActivity(docGame, {
                            url: "https://www.twitch.tv/drdisrespectlive",
                            type: "STREAMING"
                        });
                        console.log("The Arena is wide open !")
                    }


                }
            }
            else console.log("There is a problem with the api response : " + status);

        });
    await sleep(1000*120);
    if(checkIfLive)
        await checkDocStream(bot, textChannel);
}

async function checkZeratorStream(textChannel){
    let status;
    let header = {
        'Client-ID': twitch_token
    };
    fetch('https://api.twitch.tv/helix/streams?user_id=41719107',{ method: 'GET', headers: header})
        .then((response) => {
            status = response.status;
            return response.json()
        })
        .then((data) => {
            if(status == 200) {
                if (data["data"].type === undefined) {
                    zeratorIsLive = false
                } else {

                    if (!zeratorIsLive) {
                        zeratorIsLive = true;
                        textChannel.send("A little french streamer is live ! Title : " + data["data"].title + " \r => https://www.twitch.tv/zerator")
                        console.log("Zerator is live")
                    }

                }

            }
            else console.log("There is a problem with the api response : " + status);

        });
    await sleep(1000*120);
    if(checkIfLive)
        await checkZeratorStream(textChannel);
}

module.exports = class Doc {
    constructor (bot) {
        this.rudeKids =  {};
        this.broadcast = bot.createVoiceBroadcast();
        this.textChnl = bot.channels
            .filter(function(channel) {return channel.type === 'text'})
            .first()
        this.voiceChnl = bot.channels
            .filter(function(channel) {return channel.type === 'voice'})
            .first()
    }

    playVideo (url, vol) {
        this.broadcast.resume();
        var theDoc = this;
        this.voiceChnl.join()
            .then(function(connection) {
                theDoc.broadcast
                    .playStream(YoutubeStream(url), {volume : vol})
                    .on('end', function () {
                        connection.disconnect()
                    });
                connection.playBroadcast(theDoc.broadcast);
            })
    }

    paused () {
        this.broadcast.pause()
    }

    resume () {
        this.broadcast.resume()
    }

    joinFirstVchannel (message) {
        this.voiceChnl.join()
            .then(function() {
                message.channel.send("I'm here feel my breath over your neck", {tts : true});
            })
    }

    leave () {
        this.voiceChnl.leave();
        this.broadcast.destroy();
    }

    noWorries () {
        this.playVideo('https://youtu.be/UbHIViE3pRE');
    }

    imGood() {
        this.playVideo('https://youtu.be/GRAof0POU98');
    }

    gilette () {
        this.playVideo('https://youtu.be/9fWxCIi5PIw', 0.1);
    }

    whoAmI () {
        this.playVideo('https://youtu.be/3a9iwULc3lg', 0.5);
    }

    howToFortnite () {
        this.playVideo('https://youtu.be/4A229JPdXac', 0.1);
    }

    laughing (message) {
        const lols = ["<:lul:422532691817136203>", "<:noel:416549332205043712>", "<:lol:431951388751298561>"];
        const random = Math.floor(Math.random() * 3);
        message.channel.send(lols[random]);
    }

    respect (message) {
        if(this.rudeKids[message.author.id] !== undefined){
            this.rudeKids[message.author.id] = this.rudeKids[message.author.id]+1
        } else {
            this.rudeKids[message.author.id] = 1;
        }
        this.playVideo('https://youtu.be/KFEVkaHlrNs', 2);
        console.log(this.rudeKids);
    }

    watchYourMouth (message) {
        if(this.rudeKids[message.author.id] !== undefined){
            this.rudeKids[message.author.id] = this.rudeKids[message.author.id]+1 ;

            if (this.rudeKids[message.author.id] > 4){
                message.reply("Be careful, you wouldn't want to curse under my watch again\r https://imgur.com/a/v7rvO");
                this.playVideo('https://youtu.be/Jw6uHFCZSCk');
                this.rudeKids[message.author.id] = 0;
            }
        } else {
            this.rudeKids[message.author.id] = 1;
        }
        console.log(this.rudeKids);
    }

    rAUUL () {
        const rauuls = ["https://youtu.be/Y9-vGdWLg7w", "https://youtu.be/W3g9PyUDPxg", "https://youtu.be/TQgeO6GaPLo", "https://youtu.be/yx4xD8qV1cE",
            "https://youtu.be/QlI6YKDkGTE", "https://youtu.be/G38f8W_wykI", "https://youtu.be/dp1zjoJyGGQ", "https://youtu.be/P-zYLG-lSVs",
            "https://youtu.be/8cykZRS9yZ8", "https://youtu.be/UyIXuv3PO50"];

        const random = Math.floor(Math.random() * 10);
        this.playVideo(rauuls[random], 5);
    }

    banger () {
        const bangers = ["https://youtu.be/a0ZkhlJUQAM", "https://youtu.be/wy9r2qeouiQ", "https://youtu.be/ULZOgcHXwXw", "https://youtu.be/MQFszVb2IL8",
            "https://youtu.be/Mod6Ww0L2SE", "https://youtu.be/pjVUlz0HCFI", "https://youtu.be/FFrehuYAH4A", "https://youtu.be/HZ28lC55VYc",
            "https://youtu.be/YanwyGP0Li4", "https://youtu.be/YlsKhAZqQf0", "https://youtu.be/gzZ77SEiT-Q", "https://youtu.be/o7AGVRG_wkc",
            "https://youtu.be/wgw2l4ZCQDc", "https://youtu.be/G22X5X49VhM", "https://youtu.be/SMdDy2LS-ik", "https://youtu.be/IUvvGf8T7wM",
            "https://youtu.be/RfkbC8VYEWM", "https://youtu.be/gQ5gtInauiI", "https://youtu.be/MQFszVb2IL8", "https://youtu.be/RgVfU5w2CVQ",
            "https://youtu.be/EAYfJckSEN0"];

        const random = Math.floor(Math.random() * bangers.length);
        this.playVideo(bangers[random], 0.01);
    }

    bangerPlayer (message) {
        let args = message.content.split(' ');
        let val = args[1];

        switch(true) {
            case /pause/i.test(val):
                this.paused();
                break;
            case /resume/i.test(val):
                this.resume();
                break;
            case /chill/i.test(val):
                this.chill();
                break;
        }
    }

    tip (message) {
        let args = message.content.split(' ');
        let val = Number(args[1]);
        if( !isNaN(val) ) {
            switch (true) {
                case (val < 1):
                    message.reply("<:lul:422532691817136203>");
                    break;
                case (val == 1):
                    message.reply("How dare you give me one dollar ?! <:lul:422532691817136203>");
                    break;
                case (val > 1 && val < 200):
                    message.reply("Thank you for the " + val + " $ donation");
                    break;
                case (val >= 200 && val != 600):
                    message.reply("ARE YOU INSANE ?! " + val + "$ ??");
                    break;
                case (val == 600):
                    this.playVideo("https://youtu.be/duHPA2Tyu2M");
                    break;
            }
        } else {
            message.reply("What exactly are you trying to achieve here ?");
        }
    }

    randomShowUp(){
        docCall = true;
        callTheDoc(this).then(() => console.log("doc will no longer show up randomly"));
    }

    stopRandomShowUp(){
        docCall=false;
    }

    checkLive(bot) {
        checkIfLive = true;
        console.log("Now checking if The Doc or Zerator are streaming");
        checkDocStream(bot,this.textChnl).then(() => console.log("not checking if The Doc is live anymore"));
        checkZeratorStream(this.textChnl).then(() => console.log("not checking if Zerator is live anymore"));
    }

    stopCheckLive(){
        checkIfLive=false;
    }

};
