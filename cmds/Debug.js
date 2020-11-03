module.exports = {
    name: "debug",
    description: "debugging",
    execute(message){
        message.delete('timeout: 5000');
        message.channel.send(`the last message is ${message.channel.lastMessage.id} // ${message.channel.lastMessage.content}`).then(m => m.delete({timeout: 4000}));
    }
}