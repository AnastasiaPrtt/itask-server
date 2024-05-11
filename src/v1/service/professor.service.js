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
	async create(email) {
		const candidate = await db.sequelize.models.users.findOne({ where: { email } });
		if (candidate) {
			throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
		}
		// const newPassword = password.randomPassword({ characters: [password.lower, password.upper, password.digits] });
		const hashPassword = await bcrypt.hash('HelloWorld', 10);
		const activationLink = uuid.v4();
		const user = await db.sequelize.models.users.create({ email, password: hashPassword, role: 'professor', activationLink })
		// await mailService.sendActivationMailAndPassword(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`, newPassword)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		const professor = await db.sequelize.models.professors.create({ userId: userDto.id })
		const professorData = await db.sequelize.models.professors.findOne({
			where: { id: professor.id },
			include: {
				model: db.sequelize.models.users,
				as: 'users',
				attributes: ['email', 'isActivated']
			},
		})
		return {
			professor: professorData,
			message: 'Пользователь успешно создан'
		}
	}

	async getAll(limit, page, search) {
		const queryOptions = {
			where: search ? {
				[Op.or]: [
					{ fullName: { [Op.like]: `%${search}%` } },
					{ '$users.email$': { [Op.like]: `%${search}%` } }
				]
			} : {},
			include: {
				model: db.sequelize.models.users,
				as: 'users',
				attributes: ['email', 'isActivated']
			},
		};

		if (!search) {
			queryOptions.limit = limit;
			queryOptions.offset = (page - 1) * limit;
		}

		const users = await db.sequelize.models.professors.findAndCountAll(queryOptions);
		return users
	}
}

module.exports = new professorService()