module.exports = {
    name = "link",
    description = "Link account to a project",
    execute (message, args){
        if (message.channel.type != "dm"){
            message.reply("cette commande n'es utilisable qu'en message privé !");
            message.delete({timeout: 1000});
            return;
        }
        message.channel.send('works!')
    }
}