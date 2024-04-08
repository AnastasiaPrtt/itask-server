const Router = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user.controllers')

const router = new Router()

router.post(
	'/signup',
	body('email').custom(email => {
		return db.User.findOne({ where: { email } }).then(user => {
			if (user) {
				console.log(user);
				return Promise.reject('Email уже используется')
			}
		})
	}),
	userController.register
)

router.post(
	'/login',
	userController.login
)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)


router.get('/users', userController.getUsers)

module.exports = router;