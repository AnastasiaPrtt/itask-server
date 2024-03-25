const dotenv = require('dotenv').config();
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const secret = process.env.COOKIE_SECRET_KEY;

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(secret));

app.use('/api', require('./src/v1/routes/index'))

module.exports = app 