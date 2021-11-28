const mongoose = require('mongoose')

const connectDatabase = async () => {
  const username = 'root'
  const password = 'a123456'
  const uri = `mongodb://${username}:${password}@cluster0-shard-00-00.po6md.mongodb.net:27017,cluster0-shard-00-01.po6md.mongodb.net:27017,cluster0-shard-00-02.po6md.mongodb.net:27017/game?ssl=true&replicaSet=atlas-68ihtt-shard-0&authSource=admin&retryWrites=true&w=majority`
  try {
    await mongoose.connect(uri, { useNewUrlParser: true })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}

module.exports = connectDatabase
