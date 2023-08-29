const { client } = require('./index'); // Import the client variable from index.js

// Now you can use the 'client' variable here
client.on('ready', () => {
    console.log("READY #2")
});