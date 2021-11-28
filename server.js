// Create express app
const express = require('express')
const cors = require('cors')()
const playerRoute = require('./route/player')

const webapp = express()
require('./db')()

webapp.use(cors)
webapp.use(express.json())
webapp.use(
  express.urlencoded({
    extended: true,
  })
)

webapp.use('/', express.static('client-build'))

webapp.use('/', playerRoute)

// Default response for any other request
webapp.use((_req, res) => {
  res.sendStatus(404)
})

// Start server
const port = process.env.PORT || 5000
webapp.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port:${port}`)
})
