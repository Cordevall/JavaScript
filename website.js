
function website() {
    const express = require('express')
    const next = require('next')
    const RunBot = require('./runbot')
    
    const routes = './app/routes'
    const port = parseInt(process.env.PORT, 10) || 3000
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev })
    const handle = app.getRequestHandler()
    
    function createApp(express) {
      app.prepare().then(() => {
        const server = express()
      
        server.use('/api', routes)
      
        server.listen(port, (err) => {
          if (err) throw err
          console.log(`> Ready on http://localhost:${port}`)
        })
      })
    }
}
