
  
    function website() {

    const next = require('next');
    const dev = process.env.NODE_ENV !== 'production';
    const nextApp = next({ dev });




    nextApp.prepare().then(() => {
      const express = require('express');
      const app = express();
  
  
      app.use('*' , (req, res) => {
        res.send("test")
      })
      // Discord OAuth2 route
      app.get('/auth/discord', (req, res) => {
        // Handle Discord OAuth2
      });
    
      // Route to get servers
      app.get('/servers', (req, res) => {
        // Get the list of servers the user has access to
      });
    
      // Route to enable slash commands
      app.post('/commands/enable', (req, res) => {
        // Enable slash commands
      });
    
      // Route to disable slash commands
      app.post('/commands/disable', (req, res) => {
        // Disable slash commands
      });
    
      // Let Next.js handle all other routes
      app.all('*', (req, res) => {
        const handle = nextApp.getRequestHandler();
        return handle(req, res);
      });
    
      app.listen(3000, () => console.log('Server running on port 3000'));
    });
  } 
  module.exports = website