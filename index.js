//Create the bot
const Discord = require("discord.js");
const bot = new Discord.Client();
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
bot.on("guildMemberAdd", async member => {

    //Get the 2 roles separation by their id
    const project_separator = member.guild.roles.cache.find(role => role.id === "715210102516351006");
    const role_separator = member.guild.roles.cache.find(role => role.id === "733069259126865922");

    //Add these role to the new member
    member.roles.add(project_separator.id);
    member.roles.add(role_separator.id);
})

//Login the bot with de secret token
bot.login(token);