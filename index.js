const Discord = require('discord.js');
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const PREFIX = '-';
const client = new Discord.Client();

client.once('ready', () => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    client.user.setActivity("The server, Created and codded by: Hicham#1010", {type: "WATCHING"}).catch(console.error);
});
client.on('message', message => {
    ('guildMemberAdd', member => {
        member.guild.channels.get('channelID').send("Welcome"); 
    });
    if(message.content.startsWith(`${prefix}ping`)) {
        message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        
}
if (message.content === `${prefix}help` ) {
    const exampleEmbed = new Discord.MessageEmbed()
.setTitle("Help commands:")
.setDescription('Prefix is:-')
.addField("ping", "show your ping with discord API ")
.addField("server", "informations about your server")
.addField("user-info", "give your informations")
.addField("help", "give you most used commands")
.setColor([199, 21, 133])
.setThumbnail("https://www.specimen-editions.fr/wp-content/uploads/2016/08/Lettre-M.png")
message.author.send(exampleEmbed);
message.reply('All commands has sent to your DM')
}

if (message.content === `${prefix}whois`) {
    let member = message.mentions.users.first();
    if(member == undefined) message.reply('please specify someone!');
        else {
            const exampleEmbed = new Discord.MessageEmbed()
        .setTitle(member.username + '\'s Discord profile')
        .setDescription('Discord name: ' + member.tag + '\nJoin date: ' + member.createdAt)
        .setColor([199, 21, 133])
        .setThumbnail(member.avatarURL);
        message.channel.send(exampleEmbed);
        }
}

if (message.content === `${prefix}`) {
    message.channel.send("Please use the right args or check the help command by typing -help")
}

else if (message.content === `${prefix}server`) {
    const exampleEmbed = new Discord.MessageEmbed()
.setTitle("Server")
.setDescription('Bounty Hunters')
.addField('Server Name:', `${message.guild.name}`)
.addField("Total Members:", `${message.guild.memberCount}`)
.setColor([199, 21, 133])
.setThumbnail("https://cdn.discordapp.com/icons/641722874788446248/d51c8a4b101da0a85f98adc0f5193a0f.png?size=128")
message.channel.send(exampleEmbed);
}
else if (message.content === `${prefix}user-info`) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}
}
);
client.on("guildMemberAdd", (member) => {
    const newUsers = new Discord.Collection();
    const guild = member.guild;
    if (!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
    newUsers[guild.id].set(member.id, member.user);
  
    if (newUsers[guild.id].size > 10) {
      const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
      guild.channels.find(channel => channel.name === "general").send("Welcome our new users!\n" + userlist);
      newUsers[guild.id].clear();
    }
  });
  client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
  });

  client.login(process.env.BOT_TOKEN);
