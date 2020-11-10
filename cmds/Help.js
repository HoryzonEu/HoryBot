const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "help",
    description: "Affiche les commandes",
    alias: ["?"],
    execute(message, args, bot, prefix)
    {
        if(!args.length){
            var embed = new Discord.MessageEmbed()
            .setTitle("Liste des commandes")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription('-----------------')
            .setColor("BLUE")
            .setURL("https://github.com/HoryzonEu/HoryBot");
            bot.commands.forEach(cmd => {
                var name = prefix+cmd.name;
                if(cmd.alias){
                    name += " (or ";
                    cmd.alias.forEach(al => {
                        name+= prefix+al+" | ";
                    })
                    name = name.slice(0,name.length-3);
                    name += ")";
                } 
                var desc = cmd.description;
                embed.addField(name,desc,false);
            });
            message.channel.send(embed);
        }
        else if(args[0] == "invite"){
            var embed = new Discord.MessageEmbed()
            .setTitle("Commande /invite")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription('-----------------')
            .setColor("BLUE")
            .setURL("https://github.com/HoryzonEu/HoryBot")
            .addField("/invite", "Vous envoie votre code de projet")
            .addField("/invite new", "Génère un nouveau code de projet");
            message.channel.send(embed);
        }
        else if(args[0] == "link"){
            var embed = new Discord.MessageEmbed()
            .setTitle("Commande /link")
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setDescription('-----------------')
            .setColor("BLUE")
            .setURL("https://github.com/HoryzonEu/HoryBot")
            .addField("/link XXXXX", "Utilise un code de projet (en message privé) XXXXX = code de projet");
            message.channel.send(embed);
        }
        else{
            message.reply("aucun manuel n'est disponible pour cet argument !");
            message.delete({timeout: 0});
        }
    }
}