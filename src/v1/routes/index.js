const Router = require('express');
const router = new Router()

const userController = require('../controllers/user.controllers')

router.use('/auth', require('./auth'))



module.exports = router;