const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
	const { email, password } = req.body
	try {
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await db.User.create({
			email, password: hashPassword
		})
		const token = jwt.sign({
			id: user.id,
			email: user.email
		},
			process.env.TOKEN_SECRET_KEY,
			{ expiresIn: '24h' }
		)

		res.status(201).json({ token })
	} catch (error) {
		res.status(500).json(error)
	}
}

exports.login = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await db.User.findOne({
			where: { email }
		})

		if (!user) return res.status(401).json('Неверный email или пароль')

		const decryptedPass = bcrypt.compareSync(password, user.password)

		if (!decryptedPass) return res.status(401).json('Неверный пароль')

		user.password = undefined
		const token = jwt.sign({
			id: user.id,
			email: user.email
		},
			process.env.TOKEN_SECRET_KEY,
			{ expiresIn: '24h' }
		)

		res.status(200).json({ user, token })
	} catch (error) {
		res.status(500).json(error)
	}
}

exports.logout = async (req, res) => {

}

exports.activate = async (req, res) => {

}

exports.refresh = async (req, res) => {

}
exports.getUsers = async (req, res) => {
	try {
		res.json(['123'])
	} catch (error) {

	}
}