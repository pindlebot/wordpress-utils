const promisify = require('util.promisify')

let wp
let client

module.exports = (wpClient) => {
  if (wp && client === wpClient) {
    return wp
  }
  client = wpClient
  const keys = Object.keys(require('wordpress').Client.prototype)
  keys.shift()
  wp = keys.reduce((acc, key) => {
    acc[key] = promisify(wpClient[key].bind(wpClient))
    return acc
  }, {})
  return wp
}
