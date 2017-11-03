'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const _ = require('lodash');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  
  const data = JSON.parse(event.body);

  // parse fields from post
  const sessionId = uuid.v1();
  const age = _.get(data, 'age', null);

  // any validation?


  // write to the server
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: sessionId,
      age: data.age,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  

    // process stuff with this data
    const params;

    // lookup
    dynamoDb.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the todos.',
        });
        return;
      }
    }

    // generate response
    const response = {
      data: {
        id: sessionId
        risks: {
          age: 1
        }
      }
    };

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(response),
    };
    callback(null, response);
  });
};

const create(params, callback) => {
    dynamoDb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the todo item.',
        });
        return;
      }
    });
}

const lookup(params, callback) => {
  callback();
}