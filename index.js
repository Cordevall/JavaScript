import { Client, Collection, GatewayIntentBits, Partials, REST } from 'discord.js';

import { Guilds, GuildMembers, GuildMessages } from GatewayIntentBits;
import { User, Message, GuildMember, ThreadMember, Channel } from Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages],
	partials: [User, Message, GuildMember, ThreadMember],
});

process.on('unhandledRejection',(reason, promise) => {
    console.log('unhandledRejection At:', promise, 'Reason:',reason);
  });

const fs = require('node:fs');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('error',(error)=>{
    console.log("Error: "+error)
    console.log("Restarting bot...")
    start();
});

function start() {
    client.commands = new Collection();

    const functions = fs.readdirSync("./functions").filter(file => file.endsWith(".js"));
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
    const commandFolders = fs.readdirSync("./commands");
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    (async () => {
        for (file of functions) {
            require(`./functions/${file}`)(client);
        }
        client.handleEvents(eventFiles, "./events");
        client.handleCommands(commandFolders, "./commands");
    })();

    client.login(process.env.token).then(()=>{
        require('./welcomeMessage');
        
    });
    module.exports = {
        client, // Export the client variable
    };
}
module.exports = {
    client,
    start // Export the client variable
};
const website  = require('./website');
const { error } = require('node:console');
website()
start();