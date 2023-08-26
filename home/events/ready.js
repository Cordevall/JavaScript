const { Events } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config()
require('colors');


module.exports = {
    name: Events.ClientReady,
    once: true,
    
    execute(client) {
        mongoose.connect(process.env.MONGODB || '', {
            keepAlive: true,
        });

        if (mongoose.connect) {
            console.log('[MongoDb]'.green.bold, 'Database'.yellow.bold, 'connected!'.yellow.bold);
        }
        console.log(`${client.user.username}`.magenta.bold,`is`.blue,`online`.cyan.bold,`in`.blue,`${client.guilds.cache.size}`.cyan.bold, `servers!`.magenta.bold);
    }
}
