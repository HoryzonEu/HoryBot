module.exports = {
    name: "clear",
    description: "/clear x Supprime x messages",
    execute(message, args)
    {
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
        {
            message.reply("tu n'as pas le droit de faire ça !");
            message.delete({timeout: 0});
            return;
        }
        var amount;
        if (isNaN(args[0]) || parseInt(args[0]) <= 0){ 
            message.reply('entrez un nombre uniquement !')
            message.delete({timeout: 0});
            return;
        }
        if (parseInt(args[0]) > 100) {
            message.reply('vous ne pouvez supprimer que 100 messages à la fois !')
            message.delete({timeout: 0});
            return;
        } else {
            amount = parseInt(args[0]);
        }
        message.channel.bulkDelete(amount + 1, true);
        if (amount > 1) message.reply(`\`${amount}\` messages ont été supprimés`);
        else message.reply(`\`${amount}\` message a été supprimé`);
    }
}