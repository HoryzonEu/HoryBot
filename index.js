const Discord = require("discord.js");
const bot = new Discord.Client();
'use strict';

const fs = require("fs");
const { token } = require("./config.json");

bot.on("ready", function (){
    bot.user.setActivity("Pour vous servir !");
    console.log("HoryBot is ready !");
});

bot.login(token);