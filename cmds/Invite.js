module.exports = {
    name: "invite",
    description: "Generate a project's code",
    execute(message){
        //if funder
        if (message.channel.type != "dm"){
            message.member.createDM().then(dm => dm.send(makeid(5)));
            message.delete({timeout: 0});
        }
        else{
            message.channel.send(makeid(5));
            message.delete({timeout: 0});
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