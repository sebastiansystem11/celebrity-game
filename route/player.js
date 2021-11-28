const express = require('express')

const playerRoute = express.Router()
const playerService = require('../service/player')

const commonHandler = async (service, res) => {
  try {
    const result = await service()
    res.send(result)
  } catch (e) {
    if (Number(e.message) === 404) {
      res.sendStatus(404)
      return
    }
    res.status(500).send(e)
  }
}

playerRoute.get('/players', (_, res) => {
  commonHandler(playerService.getPlayers, res)
})

playerRoute.post('/players', (req, res) => {
  commonHandler(() => playerService.addPLayer(req.body), res)
})

playerRoute.get('/players/:id', (req, res) => {
  commonHandler(() => playerService.getPlayer(req.params.id), res)
})

playerRoute.put('/players/:id', (req, res) => {
  commonHandler(() => playerService.updatePlayer(req.params.id, req.body), res)
})

playerRoute.delete('/players/:id', (req, res) => {
  commonHandler(() => playerService.deletePlayer(req.params.id), res)
})

playerRoute.delete('/players', (_, res) => {
  commonHandler(playerService.deletePlayers, res)
})

playerRoute.get('/leaders/:n', (req, res) => {
  commonHandler(() => playerService.getLeaders(req.params.n), res)
})

module.exports = playerRoute
