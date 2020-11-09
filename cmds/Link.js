module.exports = {
    name: "link",
    description: "Link account to a project",
    execute (message, args){
        if (message.channel.type != "dm"){
            message.reply("cette commande n'est utilisable qu'en message privé !");
            message.delete({timeout: 0});
            return;
        }
        message.reply("Works !")
    }
}