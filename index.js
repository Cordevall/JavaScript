  const {Client, GatewayIntentBits, Partials, Collection, ActivityType, InteractionType, Routes, Events } = require('discord.js');
  const {Guilds, GuildMembers, GuildMessages} = GatewayIntentBits;
  const {User, Message, GuildMember, ThreadMember, Channel } = Partials;


  //-------------------------

  const fs = require('fs');
  const path = require('path');
  require('colors');
  require('dotenv').config();
  
  //-------------------------

  const mongoose = require('mongoose');
  
  
  //Error handler

  const process = require('node:process');
const website = require('./website');
  process.on('unhandledRejection',(reason, promise) => {
    console.log('unhandledRejection At:', promise, 'Reason:',reason);
  });
  
  //-------------------------


  // Client Intents
  const client = new Client({
      intents: [Guilds, GuildMembers, GuildMessages],
      partials: [User, Message, GuildMember, ThreadMember],
  });
  
  
  

//-------------------------

// Command Handler

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'home', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}




// Event Handler 

const eventsPath = path.join(__dirname, 'home', 'events'); // Events folder
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); // Get all event files

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file); 
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
  


// Login to Discord Using Discord API
  client.login(process.env.TOKEN).then(() => {
    const website = require('./website');
    website()
    require('./ClientReady')
  });

// Give me the exsample how to get stuff from an enviromental variable using a file and through a server.

module.exports = { client };