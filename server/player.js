const mongoose = require('mongoose')

const Player = mongoose.model('Player')

exports.getAllPlayers = async (req, res) => {
  const players = await Player.find()
  res.send(players)
}

exports.createPlayer = async (req, res) => {
  const player = await Player.create(req.body)
  res.send(player)
}

exports.getPlayer = async (req, res) => {
  const player = await Player.findById(req.params.id)
  res.send(player)
}

exports.updatePlayer = async (req, res) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body)
  res.send(player)
}

exports.deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id)
  res.send('succuss')
}

exports.getLeaders = (req, res) => {
  const { n } = req.params
  const leaders = Player.find().sort(['maxpoints', 1]).slice(n)
  res.send(leaders)
}
