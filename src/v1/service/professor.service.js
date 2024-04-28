const db = require('../models')
const { Op } = require('sequelize');
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api-error')
const password = require('secure-random-password');

class professorService {
	async create(email, role) {
		if (role !== 'professor') throw ApiError.BadRequest(`Не допустимая роль для преподавателя`)
		const candidate = await db.sequelize.models.users.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
		}
		const newPassword = password.randomPassword({ characters: [password.lower, password.upper, password.digits] });
		const hashPassword = await bcrypt.hash(newPassword, 3);
		const activationLink = uuid.v4();
		const user = await db.sequelize.models.users.create({ email, password: hashPassword, role, activationLink })
		await mailService.sendActivationMailAndPassword(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`, newPassword)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		const professor = await db.sequelize.models.professors.create({ userId: userDto.id })
		return {
			professor
		}
	}

	async getAll(limit, page, search){
		console.log(page, limit, search);
		const users = await db.sequelize.models.professors.findAndCountAll({
			where: {
				fullName: {[Op.like]: `%${search}%`}
			},
			limit: limit,
			offset: (page - 1) * limit
		})
		return users
	}
}

module.exports = new professorService()