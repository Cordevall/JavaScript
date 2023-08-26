const client = require('./index')

client.on("ready",() => {
    mongoose.connect(process.env.MONGODB || '', {
      keepAlive: true,
  });
  
  if (mongoose.connect) {
      console.log('[MongoDb]'.green.bold, 'Database'.yellow.bold, 'connected!'.yellow.bold);
  }
  console.log(`${client.user.username}`.magenta.bold,`is`.blue,`online`.cyan.bold,`in`.blue,`${client.guilds.cache.size}`.cyan.bold, `servers!`.magenta.bold);
  })

module.exports = ready