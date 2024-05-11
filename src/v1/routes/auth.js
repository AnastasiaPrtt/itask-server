const Router = require('express')
const { body } = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')
const userController = require('../controllers/user.controllers')

const router = new Router()

router.post('/signup',
	body('email').isEmail(),
	body('password').isLength({ min: 5, max: 10 }),
	userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout)
router.post('/refresh', userController.refresh)
router.get('/activate/:link', userController.activate);


module.exports = router;