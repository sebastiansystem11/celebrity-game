// Create express app
const express = require('express')
const cors = require('cors')()

const webapp = express()

require('./db')

// const playerRoute = require('./player')

webapp.use(cors)
webapp.use(express.json())
webapp.use(
  express.urlencoded({
    extended: true,
  })
)

// Root endpoint
// TODO: Will need to alter this for deployment
webapp.get('/', (req, res) => {
  res.json({ message: 'Welcome to HW4 Backend' })
})

// webapp.get('/players', playerRoute.getAllPlayers)

// webapp.post('/players', playerRoute.createPlayer)

// webapp.get('/players/:id', playerRoute.getPlayer)

// webapp.put('/players/:id', playerRoute.updatePlayer)

// webapp.delete('/players/:id', playerRoute.deletePlayer)

// webapp.get('/leaders/:n', playerRoute.getLeaders)

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404)
})

// Start server
const port = process.env.PORT || 5000
webapp.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port:${port}`)
})
