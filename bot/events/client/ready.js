const mongoose = require('mongoose')
const config = require("../../../config.json");
require('colors');


module.exports = {
    name: "ready",
    once: true,
    
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        });

        if (mongoose.connect)
        console.log('[MongoDb]'.green.bold, 'Database'.blue.bold, 'connected!'.magenta.bold);
        console.log(`${client.user.username}`.magenta.bold,`is`.blue,`online`.cyan.bold,`in`.blue,`${client.guilds.cache.size}`.cyan.bold, `servers!`.magenta.bold);
    }
}
