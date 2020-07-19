'use strict';

const AWS = require("aws-sdk");
const codepipeline = new AWS.CodePipeline({apiVersion: '2015-07-09'});

module.exports.main = (event, context, callback) => {

  if(process.env.LOGLEVEL.toLowerCase() === "debug"){
    console.info("EVENT\n" + JSON.stringify(event, null, 2))
  } 

  const pipelineName = event.pathParameters.name;

  codepipeline.getPipelineState({
    name: pipelineName,
  }).promise()
    .then(result => {
      console.log(result);
      const response = {
        statusCode: 200,
        body: JSON.stringify(result),
      };
      callback(null, response);
    })
    .catch(error => {
      callback(null, {
        statusCode: error.statusCode,
        body: JSON.stringify(error),
      });
    });
};


