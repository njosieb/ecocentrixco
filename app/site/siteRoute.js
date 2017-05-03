"use strict"

const dir = process.env.ENV === 'production' ? 'build' : 'tmp'

module.exports = function(server, log) {
  log.info('Setting static file', {
    dir
  })
  server.route({
    method: 'GET',
    path: '/{folder*}',
    config: {
      auth: false,
    },
    handler: {
      directory: {
        path: dir,
        index: true
      }
    }
  })

}
