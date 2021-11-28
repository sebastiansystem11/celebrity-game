const request = require('supertest')
const express = require('express')

const app = express()

require('../db')()

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to HW4 Backend' })
})

const playerRoute = require('../route/player')

app.use('/', playerRoute)

app.use((_req, res) => {
  res.sendStatus(404)
})

describe('player route', () => {
  it('get all players', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect({ message: 'Welcome to HW4 Backend' })
      .expect(200, done)
  })
})
