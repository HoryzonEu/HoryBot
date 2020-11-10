const fs = require('fs');
const { send } = require('process');
module.exports = {
    name: "invite",
    description: "Generate a project's code",
    execute(message, args){
        if(!isFunder(message.author.id))
        {
            message.reply("Vous n'êtes pas fondateur d'un projet !");
            return;
        }
        else {
            if (message.channel.type != "dm"){
                message.member.createDM().then(dm => {
                    if(!args.length){
                        sendCode(message.author.id, dm);
                        return;
                    }
                    else if(args[0].toLowerCase() == "new"){
                        newCode(message.author.id, dm);
                    }
                    else {
                        dm.send("Voulez vous dire */invite* ou */invite new* ?")
                    }
                });
                message.delete({timeout: 0});
            }
            else{
                if(!args.length){
                    sendCode(message.author.id, message.channel);
                    return;
                }
                else if(args[0].toLowerCase() == "new"){
                    newCode(message.author.id, message.channel);
                }
                else {
                    message.channel.send("Voulez vous dire */invite* ou */invite new* ?")
                }
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

 function isFunder(id){
    const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
    var funder = 0
    Object.values(project_file).forEach(function(project){
        if(project.funder_id == id){
            funder = 1;
        }
    })
    return funder;
 }

 function sendCode(id, channel){
    const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
    Object.values(project_file).forEach(function(project){
        if(project.funder_id == id){
            channel.send(`Votre code de projet est: ${project.invite}`);
        }
    })
 }

 function newCode(id, channel){
    const project_file = JSON.parse(fs.readFileSync("./data/projects.json", "utf-8"));
    const code = makeid(5);
    Object.values(project_file).forEach(function(project){
        if(project.funder_id == id){
            project.invite = code;
        }
    })
    fs.writeFileSync('./data/projects.json', JSON.stringify(project_file, null, 4), (err) => {
        if (err) console.error(err);
    })
    channel.send(`Votre nouveau code de projet est: ${code}`);
 }