// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const bot = new Discord.Client();
const prefix = "^";

// login to Discord with your app's token
bot.login('NTY5NjIwNjQyNzk4ODk1MTQz.XLzSkA.ViLo50FYOXzJYwhjakrOsNgmbEU');

// when the client is ready, run this code
// this event will only trigger one time after logging in
bot.once('ready', () => {
	console.log('Ready!');
});

const axios = require("axios");
const { Client, MessageEmbed } = require('discord.js');

bot.on('message', async msg => {
	let getJoke = async () => {
	let respone = await axios.get('https://gmod-servers.com/api/?object=servers&element=detail&key=roGniJK3gFlh4q7tBOSvS4KfyJpvMfhpkxs');
	let joke = respone.data
	return joke
	}
  let jokeValue = await getJoke();
  setInterval(function() {
  
    bot.user.setActivity(jokeValue.players + "/" + jokeValue.maxplayers, {type: "PLAYING"});
  }, 5000)
  if(msg.content.startsWith(prefix + "status")){
    var region = jokeValue.location;
    var ip = jokeValue.address +":"+ jokeValue.port;
    var nazwa = jokeValue.name;
    var mapa = jokeValue.map;
    var gracze = jokeValue.players + "/" + jokeValue.maxplayers;
    if(jokeValue.is_online=="1"){
      var status = "✅"
      }
      else{
      var status = "❌"
      }
    const embed = new MessageEmbed()
    .setTitle('Serwer')
    .setColor(0x23af72)
    if(jokeValue.is_online=="1"){
      embed.addField(name="Status", value="✅", inline=true)
      }
      else{
        embed.addField(name="Status", value="❌", inline=true)
      }
    embed.addField(name="Lokalizacja serwera", value=region, inline=true)
    .addField(name=".",value=".", inline=false)
    .addField(name="Connect", value=ip, inline=true)
    .setThumbnail(url="https://i.imgur.com/Feqbvee.gif")
    .addField(name="Mapa", value=mapa, inline=true)
    .addField(name="Gracze", value=gracze, inline=true)
    .setTitle('**Status serwera**')
    .setDescription("[PL] Galactic Gaming SWRP");
    //.setDescription(jokeValue.hostname);
    msg.channel.send(embed);
  }
})
