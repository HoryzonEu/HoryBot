const fs = require('fs');
module.exports = {
    name: "link",
    description: "Link account to a project",
    execute (message, args, bot){
        if (message.channel.type != "dm"){
            message.reply("cette commande n'est utilisable qu'en message privé !");
            message.delete({timeout: 0});
            return;
        }
        if(args.length != 1 || args[0].length != 5){
            message.reply("Merci de suivre ce format de commande */link XXXXX*");
            return;
        }
        else{
            const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
            var found = 0;
            var i = 0;
            var j = 0;
            var name = "";
            Object.values(project_file).forEach(function(project){
                i++;
                if(project.invite == args[0]){
                    found = 1;
                    const role = bot.guilds.cache.get('192635786024189953').roles.cache.get(project.id);
                    bot.guilds.cache.get('192635786024189953').members.cache.get(message.author.id).roles.add(role);
                    console.log(`${role.name}`);
                }
            })
            Object.keys(project_file).forEach(function(project){
                j++;
                if(i == j) name = project;
            })
            if(found){
                message.reply(`Vous avez rejoint le projet ${name} !`)
            }else{
                message.reply('Code inconnu !');
            }
        }
    }
}