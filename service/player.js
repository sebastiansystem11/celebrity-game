const PlayerModel = require('../model/schema')

const getPlayers = async () => {
  const players = await PlayerModel.find()
  return players
}

const getPlayer = async (id) => {
  const player = await PlayerModel.findById(id)
  if (!player) {
    throw new Error(404)
  }
  return player
}

const addPLayer = async (data) => {
  const { _id } = await PlayerModel.create(data)
  const player = await getPlayer(_id)
  return player
}

const updatePlayer = async (id, data) => {
  const player = await PlayerModel.findByIdAndUpdate(id, data)
  if (!player) {
    throw new Error(404)
  }
  return player
}

const deletePlayer = async (id) => {
  const player = await PlayerModel.findByIdAndDelete(id)
  if (!player) {
    throw new Error(404)
  }
  return player
}

const deletePlayers = async () => {
  await PlayerModel.deleteMany()
  return true
}

const getLeaders = async (n) => {
  const leaders = await PlayerModel.find()
    .sort({ maxpoints: -1 })
    .limit(Number(n))
  return leaders
}

module.exports = {
  getPlayers,
  getPlayer,
  addPLayer,
  updatePlayer,
  deletePlayer,
  deletePlayers,
  getLeaders,
}
