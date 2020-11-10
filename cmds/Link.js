const fs = require('fs');
module.exports = {
    name: "link",
    description: "Permet d'utiliser un code de projet /help link",
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
                    if(member.roles.cache.some(r => r.id === project.id)) found = -1;
                    else  member.roles.add(role);
                    if (found == 1)
                    {
                        project.invite = makeid(5);
                        guild.members.cache.get(project.funder_id).createDM().then(dm => dm.send(`<@${member.id}> a rejoint ton projet ! Voilà ton nouveau code de projet: ${project.invite}`));
                        fs.writeFileSync('./data/projects.json', JSON.stringify(project_file, null, 4), (err) => {
                            if (err) console.error(err);
                        })
                    }
                }
            })
            Object.keys(project_file).forEach(function(project){
                j++;
                if(i == j) name = project;
            })
            if(found > 0){
                message.reply(`Vous avez rejoint le projet ${name} !`)
            }else if(found = -1){
                message.reply(`Vous avez déjà rejoint le projet ${name} !`)
            }else{
                message.reply('Code inconnu !');
            }
        }
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }