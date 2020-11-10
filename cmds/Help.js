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
        else if(args.length > 1){
            message.reply("merci de ne renseignez qu'un arguments !")
            message.delete({timeout: 0});
        }
        else if(args[0] == "invite"){
            var embed = new Discord.MessageEmbed()
            .setTitle("Commande /invite")
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
            .setDescription('-----------------')
            .setColor("BLUE")
            .setURL("https://github.com/HoryzonEu/HoryBot")
            .addField("/link XXXXX", "Utilise le code XXXXX(en message privé)");
            message.channel.send(embed);
        }
        else if(args[0] == "newproject" || args[0] == "np"){
            var embed = new Discord.MessageEmbed()
            .setTitle("Commande /newproject")
            .setDescription('-----------------')
            .setColor("BLUE")
            .setURL("https://github.com/HoryzonEu/HoryBot")
            .addField("/newproject PROJET @Fondateur", "Créer un nouveau projet appelé PROJET et défini l'utilisateur mentionné en tant que fondateur");
            message.channel.send(embed);
        }
        else{
            message.reply("aucun manuel n'est disponible pour cet argument !");
            message.delete({timeout: 0});
        }
    }
}