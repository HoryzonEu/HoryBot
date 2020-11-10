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
                    const guild = bot.guilds.cache.get('192635786024189953');
                    const role = guild.roles.cache.get(project.id);
                    const member = guild.members.cache.get(message.author.id);
                    if(member.roles.cache.find(r => r.id === project.id)) found = -1;
                    else member.roles.add(role);
                }
            })
            Object.keys(project_file).forEach(function(project){
                j++;
                if(i == j) name = project;
            })
            if(found){
                message.reply(`Vous avez rejoint le projet ${name} !`)
            }else if(found = -1){
                message.reply(`Vous avez déjà rejoint le projet ${name} !`)
            }else{
                message.reply('Code inconnu !');
            }
        }
    }
}