const fs = require('fs');
module.exports = {
    name: "newproject",
    description: "Ajoute un projet au serveur (Admin only) /help newproject || np",
    alias: ['np'],
    execute(message, args){
        const role_pos = message.guild.roles.cache.get('733069259126865922').position + 1;
        const funder = message.guild.roles.cache.get('733070093570932739');
        if (!message.member.roles.cache.has('715210617149194270')){
            message.reply("vous n'avez pas la permission d'effectuer cette commande !");
            message.delete({timeout: 0});
        }
        else{
            if(message.mentions.users.first() && args.length == 2)
            {
                if(message.guild.roles.cache.find(role => role.name === args[0].toUpperCase())){
                    message.reply("ce projet existe deja !");
                    message.delete({timeout: 0});
                    return;
                }
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
                    message.guild.channels.create(args[0].toLowerCase(), {
                        parent: "714087995094859818"
                    }).then(chan => {
                        chan.overwritePermissions(role.id), {SEND_MESSAGES: true, VIEW_CHANNEL: true}
                        chan.overwritePermissions("192635786024189953"), {SEND_MESSAGES: false, VIEW_CHANNEL: false}
                    })
                    message.channel.send(`Le projet <@&${role.id}> a été créé !`);
                    message.guild.members.cache.get(message.mentions.users.first().id).roles.add(role);
                    message.guild.members.cache.get(message.mentions.users.first().id).roles.add(funder);
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