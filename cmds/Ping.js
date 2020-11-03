//Export the command to the index.js
module.exports = {
    //Name of the commande so there we'lle use /ping
    name: "ping",
    //Or /ptest
    alias: ["ptest"],
    //Description for a potential help command
    description: "Test the bot reaction",
    //The script of the command
    execute(message, args){
        message.channel.send("Pong !");
    }
}