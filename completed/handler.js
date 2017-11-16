const query = require('./lib/user.query')
const put = require('./lib/user.put')

module.exports.sync = (event, context, callback) => {
  query()
    .then(users => put(users))
    .then(() => {
      callback(null, { statusCode: 200 })
    })
}
