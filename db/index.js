const mongoose = require('mongoose')

const connectDatabase = () => {
  const username = 'root'
  const password = 'a123456'
  const uri = `mongodb://${username}:${password}@cluster0-shard-00-00.po6md.mongodb.net:27017,cluster0-shard-00-01.po6md.mongodb.net:27017,cluster0-shard-00-02.po6md.mongodb.net:27017/game?ssl=true&replicaSet=atlas-68ihtt-shard-0&authSource=admin&retryWrites=true&w=majority`

  mongoose.connect(uri, { useNewUrlParser: true })

  const db = mongoose.connection
  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

module.exports = connectDatabase
