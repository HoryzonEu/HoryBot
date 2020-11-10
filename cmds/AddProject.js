const { GuildMember } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: "newproject",
    description: "Add a project to the server",
    alias: ['np'],
    execute(message, args){
        const horyzon_team = message.guild.roles.cache.get('715210617149194270');
        const role_pos = message.guild.roles.cache.get('733069259126865922').position + 1;
        if (!message.member.roles.cache.has('715210617149194270')){
            message.reply("vous n'avez pas la permission d'effectuer cette commande !");
            message.delete({timeout: 0});
        }
        else{
            if(message.mentions.users.first() && args.length == 2)
            {
                const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
                message.guild.roles.create({
                    data: {
                        name: args[0].toUpperCase(),
                        color: 'GREEN',
                        position: role_pos
                    }
                }).then(role => {
                    project_file[role.name] = {
                        id: role.id,
                        funder_id: message.mentions.users.first().id,
                        funder_name: message.mentions.users.first().username,
                        invite: makeid(5)
                    };
                    fs.writeFileSync('./data/projects.json', JSON.stringify(project_file, null, 4), (err) => {
                        if (err) console.error(err);
                    })
                    message.channel.send(`Le projet <@&${role.id}> a été créer !`);
                    message.guild.members.cache.get(message.mentions.users.first().id).role.add(role);
                })
                
            }else{
                message.reply("merci de préciser le nom du projet et de mentionner le fondateur !");
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