// REQUIRED FILE! DON'T CHANGE UNLESS YOU KNOW WHAT YOUR DOING. YOU HAVE BEEN WARNED!
function loadEvents(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii().setHeading("Events , Status");
    const folders = fs.readdirSync('./bot/events');
    for(const folder of folders){
        const files = fs.readdirSync(`./bot/events/${folder}`).filter(file => file.endsWith(".js"));
        for(const file of files){
            const event = require(`../events/${folder}/${file}`);
            if(event.rest){
                if(event.once) 
                client.rest.once(event.name, (...args) => event.execute(...args, client));

                else 
                client.rest.on(event.name, (...args) => event.execute(...args, client));
            }
            else{
                if(event.once) 
                client.once(event.name, (...args) => event.execute(...args, client));

                else 
                client.on(event.name, (...args) => event.execute(...args, client));
            }
            if (!file) table.addRow(file, "Failed"); else {
                table.addRow(file,"loaded")
                continue;
            }
        }
    }
    return console.log(table.toString().cyan, "\nLoaded events".cyan.bold);
}

module.exports = {loadEvents};