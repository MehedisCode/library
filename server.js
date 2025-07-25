const express = require('express')
const app = express();
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views/')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const indexRoute = require('./routes/index')
app.use('/', indexRoute);

app.listen(3000, () => {
    console.log("Listenning port 3000");
})