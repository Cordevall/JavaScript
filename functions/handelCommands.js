const { REST, Routes, User, Application } = require("discord.js");
const fs = require('fs');
require('dotenv').config();


const commandHandler = (client) => {
    client.handleCommands = async (commandFolders, path2) => {
        client.commandArray = [];
        try {
            for (folder of commandFolders) {
                const path = require('path');
                // If folder
                if(!folder.toString().includes('.js')) {
                    const commandFiles = fs.readdirSync(path.join(__dirname, `../commands`, folder)).filter(file => file.endsWith('.js'));
    
                    for (const file of commandFiles) {
                        const command = require(`../commands/${folder}/${file}`);
                        if(client.commands.get(command.data.name)) continue;
        
                        client.commands.set(command.data.name, command);
                        client.commandArray.push(command.data.toJSON());
                    }
                } else {
                    const command = require(`../commands/${folder}`);
                    if(client.commands.get(command.data.name)) continue;
        
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                }
            }
        } catch (error) {
            console.log(error)
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        
        (async () => {
            try {
                await rest.put(
                    Routes.applicationCommands(process.env.appID, process.env.appID), {
                        body: client.commandArray
                    },
                );
            } catch (error) {
                console.error(error);
            }
        })();
    };
}

export default commandHandler;