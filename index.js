//Create the bot
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
'use strict';

//Init the node modules and config parameters
const fs = require("fs");
const { token, prefix } = require("./config.json");


//Create collections
bot.commands = new Discord.Collection();
bot.alias = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));

//List all the commands
for(const file of commandFiles){
    const command = require(`./cmds/${file}`);
    bot.commands.set(command.name, command);
    if(command.alias){
        command.alias.forEach(al => {
            bot.alias.set(al, command);
        })
        
    } 
}

//Set the activity of the bot when he's ON
bot.once("ready", function (){
    bot.user.setActivity("Pour vous servir !");
    console.log("HoryBot is ready !");
});

//Get the Message Event
bot.on("message", async message => {

    //If the author is a bot, don't continue
    if(message.author.bot) return;
    
    //Split the commands and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //If the command doesn't exit, don't continue
    if(!(bot.commands.has(command) || bot.alias.has(command))) return;

    //Execute the command or catch potentials errors
    try{
        if(bot.commands.has(command)){
            bot.commands.get(command).execute(message, args);
        }else if(bot.alias.has(command)){
            bot.alias.get(command).execute(message, args);
        }
        
    }catch(error){
        console.error(error);
        message.reply("OOPS... An error occured");
    }
});

//Get the New Member Event
bot.on("guildMemberAdd", member => {

    //Get the 2 roles separation by their id
    const project_separator = member.guild.roles.cache.get("715210102516351006");
    const role_separator = member.guild.roles.cache.get("733069259126865922");

    //Add these role to the new member
    member.roles.add(project_separator).catch(console.error);
    member.roles.add(role_separator).catch(console.error);
});

bot.on("messageReactionAdd", async (reaction, user) => {
    const fonda = reaction.message.guild.roles.cache.get("733070093570932739");
    const admin = reaction.message.guild.roles.cache.get("733069436969549834");
    console.log(`reaction added on message ${reaction.message.id}`);
    if (reaction.partial) {
        try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    if(reaction.message.id == "773019180156583947")
    {
        const member = reaction.message.guild.members.cache.get(user.id);
        console.log(`reaction added by ${member.id}`);
            switch(reaction.emoji.name){
                case "1️⃣":
                    if(!member.roles.has(fonda)){
                        member.roles.add(fonda)
                    }
                    break;
                case "2️⃣":
                    if(!member.roles.has(admin)){
                        member.roles.add(admin)
                    }
                    break;
                default:
                    reaction.remove();
                    break;
            }
    }
});

bot.on("messageReactionRemove", (reaction, user) => {
    const fonda = reaction.message.guild.roles.cache.get("733070093570932739");
    const admin = reaction.message.guild.roles.cache.get("733069436969549834");
    console.log(`reaction removed on message ${reaction.message.id}`);
    if (reaction.partial) {
        try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
            return;
        }
    }
    if(reaction.message.id == "773019180156583947")
    {
        const member = reaction.message.guild.members.cache.get(user.id);
        console.log(`reaction removed by ${member.id}`);
            switch(reaction.emoji.name){
                case "1️⃣":
                    if(member.roles.has(fonda)){
                        member.roles.remove(fonda)
                    }
                    break;
                case "2️⃣":
                    if(member.roles.has(admin)){
                        member.roles.remove(admin)
                    }
                    break;
                default:
                    break;
                }
    }
});

//Login the bot with de secret token
bot.login(token);


function length(obj) {
    return Object.keys(obj).length;
}
