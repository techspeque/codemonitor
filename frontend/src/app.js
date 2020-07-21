const listpipelines = require('./utils/listpipelines')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

// define port of the application, check env vars if not set to 3000



// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// serve static assets, static dir
app.use(express.static(publicDirectoryPath))

// set default view engine, handle bars
app.set('view engine','hbs')
app.set('views', viewsPath)

// use partials via handlebars
hbs.registerPartials(partialsPath)

// use dynamic contnent rendering 
// render index page

app.get('/', (req, res) => {
    res.render('index', {
        title: 'codemonitor | main',
        author: '@techspeque'
    })
})

// ============= API ============= 

// get all pipelines
app.get('/api/pipelines', (req, res) => {

    // pass error and data to callback function
    listpipelines((error, {body} = {}) => {

        if(error){
            return res.send({ error })
        }

        res.send({
            data: body,
        })
    })
})

// ============= --- ============= 

app.get('/pipelines', (req, res) => {
    res.render('pipelines', {
        title: 'codemonitor | pipelines',
        author: '@techspeque'
    })
})


// catch all for specific route
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 | help',
        author: '@techspeque',
        message: 'Help aricle was not found',
        url: req.url
    })
})

// catch all must be the last entry
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        author: '@techspeque',
        message: 'Requested page was not found',
        url: req.url
    })
})

// TODO
// update port to be dynamic
app.listen(5555, () => {
    console.log("Server is up on port 5555")
})