const Discord = require('discord.js');
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const PREFIX = '-';
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', message => {
if (message.content === 'ping') {
	message.channel.send('Pong.');
    }
else if (message.content === `${prefix}server`) {
    message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}
else if (message.content === `${prefix}user-info`) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}
let args = message.content.substring(prefix.length).split(" ");
switch(args[0]){
    case 'whois': {
    let member = message.mentions.users.first();
if(member == undefined) message.reply('please specify someone!');
    else {
        const exampleEmbed = new Discord.MessageEmbed()
    .setTitle(member.username + '\'s Discord profile')
    .setDescription('Discord name: ' + member.tag + '\nJoin date: ' + member.createdAt)
    .setColor([199, 21, 133])
    .setThumbnail(member.avatarURL);
    message.channel.send(exampleEmbed);
}}
    break;
case 'help': {
    const exampleEmbed = new Discord.MessageEmbed()
.setTitle("Help commands:")
.addField("ping", "- + ping")
.addField("server", "- + server")
.addField("user-info", "- + user-info")
.addField("help", "- + help")
.setColor([199, 21, 133])
.setThumbnail("https://www.specimen-editions.fr/wp-content/uploads/2016/08/Lettre-M.png")
message.author.send(exampleEmbed);
message.channel.send('All commands has sent to your DM')
}    
}
}
);

client.login(config.token);