const model = require("../models");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const userService = require('../service/user.service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

exports.register = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
		}
		const { email, password, role } = req.body
		const userData = await userService.registration(email, password, role)
		// res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
		return res.json(userData)
	} catch (error) {
		next(error)
	}
}

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body
		userData = await userService.login(email, password)
		// res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
		return res.json(userData)
	} catch (error) {
		next(error)
	}
}

exports.logout = async (req, res, next) => {
	try {
		const {refreshToken} = req.cookies
		const token = await userService.logout(refreshToken)
		// res.clearCookie('refreshToken')
		res.json({token})
	} catch (error) {
		next(error)
	}
}

exports.activate = async (req, res, next) => {
	try {
		const activationLink = req.params.link
		await userService.activate(activationLink)
		return res.redirect(process.env.CLIENT_URL)
	} catch (error) {
		next(error)
	}
}

exports.refresh = async (req, res, next) => {
	try {
		const {refreshToken} = req.body
		userData = await userService.refresh(refreshToken)
		// res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
		return res.json(userData)
	} catch (error) {
		next(error)
	}
}
exports.getUsers = async (req, res, next) => {
	try {
		const data = req.query
		const users = await userService.getAllUsers(data)
		return res.json(users)
	} catch (error) {
		next(error)
	}
}