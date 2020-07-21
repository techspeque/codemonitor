const request = require('postman-request')

const listpipelines = (callback) => {

    const url = "https://8barnfyc9i.execute-api.eu-west-1.amazonaws.com/dev/codepipeline/pipelines/list"

    // destructure body from the response object use the body property and define it as a body object
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to codemonitor API" , undefined)
        }else if(body.error){
            callback("Unable to get codepipeline pipelines list", undefined)
        }else{
            callback(undefined, {body})
        }
    });
}

module.exports = listpipelines