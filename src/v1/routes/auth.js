const Router = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user.controllers')

const router = new Router()

router.post(
	'/signup',
	body('email').custom(email => {
		return User.findOne({ where: { email } }).then(user => {
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

module.exports = router;