const jwt = require('jsonwebtoken');
const db = require('../models/index');

exports.generateTokens = async (payload) => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
		expiresIn: '30m'
	})
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
		expiresIn: '30d'
	})
	return {
		accessToken, refreshToken
	}
};

exports.saveToken = async (userId, refreshToken) => {
	const tokenData = await db.Token.findOne({where: userId});
	if(tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save()
	}
	const token = await db.Token.create({userId, refreshToken})
}