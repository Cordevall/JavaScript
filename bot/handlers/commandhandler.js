// REQUIRED FILE! DON'T CHANGE UNLESS YOU KNOW WHAT YOUR DOING. YOU HAVE BEEN WARNED!
function loadCommands (client) {
    const ascii = require('ascii-table')
    const fs = require("fs");
    const table = new ascii().setHeading("Commands", "Status");
    
    let commandsArray = [];

    const commandsFolder = fs.readdirSync("./bot/commands");

    for (const folder of commandsFolder) {
        const commandsFiles = fs.readdirSync(`./bot/commands/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of commandsFiles) {
            const commandFile = require(`../commands/${folder}/${file}`);
            const properties = {folder, ...commandFile};
            client.commands.set(commandFile.data.name, properties);

            commandsArray.push(commandFile.data.toJSON());

            if (!file) table.addRow(file, "Failed"); else {
                table.addRow(file,"loaded")
                continue;
            }
        }
    }

    client.application.commands.set(commandsArray);

    console.log(table.toString().magenta, "\nLoaded Commands".magenta.bold);
    return;
}
module.exports = { loadCommands };
