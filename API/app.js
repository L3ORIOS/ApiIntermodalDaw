'use strict'

const express = require('express')
const bodyParser = require('body-parser')
//const hbs = require('express-handlebars')


const app = express()
var path = require('path');

const api = require('./routes')
const { modelName } = require('./models/user')

app.use(express.json())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// app.engine('.hbs', hbs({
//     defaultLayout:'default',
//     extname : '.hbs'
// }))
app.use('/uploads',express.static(`${__dirname}/public/images`))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));


app.use('/',api)








module.exports = app




