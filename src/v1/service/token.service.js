const jwt = require('jsonwebtoken');
const db = require('../models');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
			expiresIn: '30m'
		})
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
			expiresIn: '30d'
		})
		return {
			accessToken, refreshToken
		}
	}

	async validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	async validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await db.sequelize.models.tokens.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save()
		}
		const token = await db.sequelize.models.tokens.create({ userId, refreshToken })
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await db.sequelize.models.tokens.destroy({ where: { refreshToken } })
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await db.sequelize.models.tokens.findOne({ where: { refreshToken } })
		return tokenData
	}
}

module.exports = new TokenService();