const { GuildMember } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "newproject",
    description: "Add a project to the server",
    alias: ['np'],
    execute(message, args){
        const horyzon_team = message.guild.roles.cache.get('715210617149194270');
        if (!message.member.roles.cache.has('715210617149194270')){
            message.reply("vous n'avez pas la permission d'effectuer cette commande !");
            message.delete({timeout: 0});
        }
        else{
            if(message.mentions.users.first() && args.length == 2)
            {
                message.reply(`Nouveau projet ${args[0].toUpperCase()} + debug: ${horyzon_team.position}`)
            }else{
                message.reply("merci de préciser le nom du projet et de mentionner le fondateur !");
            }
        }
    }
}