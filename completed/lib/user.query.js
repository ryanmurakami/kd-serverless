const axios = require('axios')
const _ = require('lodash')

let users

module.exports = function query () {
  users = []

  return new Promise((resolve) => {
    recurse(0, resolve)
  })
}

function recurse (skip, resolve) {
  request(skip)
    .then((userResponse) => {
      if (userResponse && userResponse.length) {
        users = users.concat(userResponse)
        recurse(users.length, resolve)
      } else {
        resolve(users)
      }
    })
}

function request (skip) {
  const url = `http://${process.env.institution}.kuali.co/api/v1/users`
  const options = {
    params: { skip },
    headers: {
      Authorization: `Bearer ${process.env.apiKey}`,
      Accept: 'application/vnd.kuali.v1+json'
    }
  }

  return axios.get(url, options)
    .then((res) => {
      return res.data
    })
}
