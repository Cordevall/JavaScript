function RunBot() {
const {Client, GatewayIntentBits, Partials, Collection, ActivityType, InteractionType, Routes } = require('discord.js');
const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
const {User, Message, GuildMember, ThreadMember, Channel } = Partials;
require('colors');
//-------------------------


//Error handler
const process = require('node:process')
process.on('unhandledRejection',(reason, promise) => {
  console.log('unhandledRejection At:', promise, 'Reason:',reason);
});


const{ loadEvents } = require('./bot/handlers/eventhandler');
const{ loadCommands } = require("./bot/handlers/commandhandler");


const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember],
});
client.commands = new Collection();

client.config = require("./setup.json");

client.login(client.config.token).then(() => {
    loadEvents(client);
    loadCommands(client);
});

} 
module.exports = RunBot