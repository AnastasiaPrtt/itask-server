const Router = require('express');
const router = new Router()

router.use('/auth', require('./auth'))
router.use('/users', require('./users'))
router.use('/professor', require('./professor'))
router.use('/course', require('./course'))
router.use('/group', require('./group'))

module.exports = router;