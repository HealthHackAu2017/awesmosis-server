'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const _ = require('lodash');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const UNDEFINED = -1;

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  
  const data = JSON.parse(event.body);
  
  // parse fields from post
  const sessionId = uuid.v1();
  const age = getInteger(data, 'age');
  const pregnacy_num = getInteger(data, 'pregnacy_number');
  const fertility_issue = getBoolean(data, 'fertility_issue');
  const smoker_status = getBoolean(data, 'smoker_status');
  const partners = getInteger(data, 'partners');
  const sti_num = getInteger(data, 'sti_num');
  const sti_type = getInteger(data, 'sti_type');
  const edm = getBoolean(data, 'edm');
  const pco = getBoolean(data, 'pco');
  const periods_irregular = getBoolean(data, 'periods_irregular');
  const ep = getBoolean(data, 'ep');
      
  // format data for processing
  const lookupParams = [{
    age: age,
    pregnacy_num: pregnacy_num, 
    fertility_issue: fertility_issue, 
    smoker_status: smoker_status,
    partners: partners, 
    sti_num: sti_num, 
    sti_type: sti_type, 
    edm: edm, 
    pco: pco, 
    periods_irregular: periods_irregular, 
    ep
  }];

  // do processing
  lookup(lookupParams, (response) => {
    // return response
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  });
};

const lookup(params, callback) => {
  const response = {};
  return response;
}

const getInteger = (data, field) => parseInt(_.get(data, field, UNDEFINED), 10);

const getBoolean = (data, field) => {
  const value = _.get(data, field, UNDEFINED);

  if (value === UNDEFINED) return UNDEFINED;
  
  const firstLetter = value.charAt(0).toLowerCase();
  return firstLetter === 'y' ? 1 : 0;
}
