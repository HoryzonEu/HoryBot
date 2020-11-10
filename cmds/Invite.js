const fs = require('fs');
module.exports = {
    name: "invite",
    description: "Generate a project's code",
    execute(message){
        if(!isFunder(message.author.id))
        {
            message.reply("Vous n'êtes pas fondateur d'un projet !");
            return;
        }
        else {
            if (message.channel.type != "dm"){
                message.member.createDM().then(dm => dm.send(makeid(5)));
                message.delete({timeout: 0});
            }
            else{
               message.channel.send(makeid(5));
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