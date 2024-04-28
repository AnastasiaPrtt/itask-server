const Router = require('express')
const CourseController = require('../controllers/course');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router()

router.post('/', authMiddleware, CourseController.create)

module.exports = router;