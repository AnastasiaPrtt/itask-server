const dotenv = require('dotenv').config();
const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./src/v1/middlewares/error-middleware')

const app = express()
const secret = process.env.COOKIE_SECRET_KEY;

app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(secret));

app.use('/api', require('./src/v1/routes/index'))


app.use(errorMiddleware)

module.exports = app 