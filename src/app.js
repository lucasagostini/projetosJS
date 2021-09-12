const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 8080
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather app',
        name: 'Lucas Agostini'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name: 'Lucas Agostini'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Ajuda',
        name: 'Lucas Agostini',
        helpText: 'Um texto de ajuda, se vira aí'
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Lucas Agostini',
        errorMessage:'Help Article cannot be found.'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
            if (error) {
                return res.send({ error })
            }
            else {
                forecast(latitude, longitude, location, (error, forecastData) => {
                    if (error) {
                        return res.send({error})
                    }
                    else {
                        return res.send({
                            forecastData,
                            location,
                            address: req.query.address
                    })
                    }
    
                    
                })
            }
    
        })
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []    })
})


app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Lucas',
        errorMessage:'This page cannot be found.'
    })
})

app.listen(port, () => {
    console.log('Servidor aberto na porta ' + port)
})

