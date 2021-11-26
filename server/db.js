// const mongoose = require('mongoose')

// const username = 'root'
// const password = 'a123456'
// mongoose
//   .connect(
//     `mongodb://${username}:${password}@cluster0-shard-00-00.po6md.mongodb.net:27017,cluster0-shard-00-01.po6md.mongodb.net:27017,cluster0-shard-00-02.po6md.mongodb.net:27017/game?ssl=true&replicaSet=atlas-68ihtt-shard-0&authSource=admin&retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then((res) => {
//     console.log(res)
//   })

const { MongoClient } = require('mongodb')

const uri =
  'mongodb://root:<password>@cluster0-shard-00-00.po6md.mongodb.net:27017,cluster0-shard-00-01.po6md.mongodb.net:27017,cluster0-shard-00-02.po6md.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-68ihtt-shard-0&authSource=admin&retryWrites=true&w=majority'
MongoClient.connect(uri, (err, client) => {
  console.log(err)

  // const collection = client.db('test').collection('devices')
  // perform actions on the collection object
  client.close()
})
