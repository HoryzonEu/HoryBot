//Export the command to the index.js
module.exports = {
    //Name of the commande so there we'lle use /ping
    name: "ping",
    //Or /ptest
    alias: ["ptest"],
    //Description for a potential help command
    description: "Test si le bot est vivant",
    //The script of the command
    async execute(message, args){
        //Delete the message after 5 seconds
        message.delete({ timeout: 5000 })
        //Reply to the commands then delete the reply after 5 seconds
        message.channel.send("Pong !").then(m => m.delete({ timeout: 5000 }));
    }
}