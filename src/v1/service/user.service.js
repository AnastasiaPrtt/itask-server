const db = require('../models/index')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const malService = require('./mail.service')

exports.registration = async (email, password, role) => {
	const candidate = await db.User.findOne({email});
	if(candidate){
		throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
	}
	const hashPassword = await bcrypt.hash(password, 3);
	const activateLink = uuid.v4()
	const user = await db.User.create({email, password: hashPassword, role, activateLink})
	await malService.sendActivationMail(email, activateLink)
}