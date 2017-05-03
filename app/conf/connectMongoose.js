'use strict'

const mongoose = require('mongoose')

const localConnection = 'mongodb://127.0.0.1:27017/'
mongoose.Promise = global.Promise

module.exports = function (log) {

  const connUrl = process.env.MONGODB_URI || localConnection
  const options = {
    promiseLibrary: global.Promise
  }
  mongoose.connect(`${connUrl}`, options)

  log.info('Connecting to MongoDb.', {
    connUrl
  })
}
