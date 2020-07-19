'use strict';

const AWS = require("aws-sdk");
const codepipeline = new AWS.CodePipeline({apiVersion: '2015-07-09'});

module.exports.main = (event, context, callback) => {

  if(process.env.LOGLEVEL.toLowerCase() === "debug"){
    console.info("EVENT\n" + JSON.stringify(event, null, 2))
  } 

  // using standard callback

  // const onList = (err, data) => {

  //     if (err) {
  //         console.log('Could not get pipelines. Error JSON:', JSON.stringify(err, null, 2));
  //         callback(err);
  //     } else {
  //         console.log("List succeeded.");
  //         return callback(null, {
  //             statusCode: 200,
  //             body: JSON.stringify({
  //                 pipelines: data
  //             })
  //         });
  //     }
  // };

  // codepipeline.listPipelines(params, onList);

  codepipeline.listPipelines({}).promise()
    .then(result => {
      callback(null, {
        statusCode: result.statusCode,
        body: JSON.stringify(result),
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: error.statusCode,
        body: JSON.stringify(error),
      })
    });
};
