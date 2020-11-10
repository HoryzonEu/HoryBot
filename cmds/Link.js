module.exports = {
    name: "link",
    description: "Link account to a project",
    execute (message, args, bot){
        if (message.channel.type != "dm"){
            message.reply("cette commande n'est utilisable qu'en message privé !");
            message.delete({timeout: 0});
            return;
        }
        if(args.lenght != 1){
            message.reply("Merci de suivre ce format de commande */link XXXXX*");
            return;
        }
        else{
            const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
            var found = 0;
            var name = "";
            Object.values(project_file).forEach(function(project){
                if(project.funder_id == id){
                    found = 1;
                    const role = bot.guilds.cache.get('715631412832763954').roles.cache.get(project.id);
                    bot.guilds.cache.get('715631412832763954').members.cache.get(message.author.id).roles.add(role);
                    name = project;
                }
            })
            if(found){
                message.reply(`Vous avez rejoint le projet ${name} !`)
            }else{
                message.reply('Code inconnu !');
            }
        }
    }
}