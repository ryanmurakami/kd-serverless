const AWS = require('aws-sdk')
const { omitBy } = require('lodash')

AWS.config.update({ region: process.env.AWS_REGION })

const client = new AWS.DynamoDB.DocumentClient()

module.exports = function putAll (users) {
  const batches = []

  while (users.length > 0) {
    const batch = users.splice(0, 25)
    batches.push(batch)
  }

  return Promise.all(batches.map(batch => writeBatch(batch)))
}

function writeBatch (batch) {
  return new Promise((resolve) => {
    const requestItems = batch.map(user => ({
      PutRequest: {
        Item: omitBy(user, val => val === '')
      }
    }))
    const params =  {
      RequestItems: {
        [process.env.table]: requestItems
      }
    }

    return new Promise((resolve, reject) => {
      client.batchWrite(params, (err, data) => {
        if (err) reject(`Could not put all users with: ${err}`)
        else resolve()
      })
    })
  })
}
