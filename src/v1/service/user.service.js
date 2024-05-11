const db = require('../models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api-error')
const { Op } = require('sequelize')

class userService {
	async registration(email, password, role) {
		const candidate = await db.sequelize.models.users.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4()
		const user = await db.sequelize.models.users.create({ email, password: hashPassword, role, activationLink })
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async activate(activationLink) {
		const user = await db.sequelize.models.users.findOne({ where: { activationLink } })
		if (!user) {
			throw ApiError.BadRequest('Некорректная ссылка активации')
		}
		user.isActivated = true;
		await user.save()
	}

	async login(email, password) {
		const user = await db.sequelize.models.users.findOne({ where: { email } })
		if (!user) {
			throw ApiError.BadRequest('Пользователь с таким email не был найден')
		}
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequest('Пароль не верный')
		}
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = db.sequelize.models.users.findByPk(userData.id)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async getAllUsers(data) {
		try {
			const { search } = data
			const users = await db.sequelize.models.users.findAll({
				where: {
					[Op.or]: [
						{ email: { [Op.like]: `%${search}%` } },
						{ '$professors.fullName$': { [Op.like]: `%${search}%` } }
					]
				},
				include: [
					{
						model: db.sequelize.models.professors,
						as: 'professors',
						required: false
					}
				],
				attributes: { exclude: ['password'] }
			});

			return users;
		} catch (error) {
			console.error('Ошибка при поиске пользователей:', error);
			throw error;
		}
	}
}


module.exports = new userService()