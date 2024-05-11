const professorService = require('../../service/professor.service');

exports.create = async (req, res, next) => {
	try {
		const userData = req.user
		if (userData.role !== 'admin') {
			throw ApiError.BadRequest('У вас нет прав администратора')
		}
		const { email } = req.body
		const professorData = await professorService.create(email, req.user)
		return res.json(professorData)
	} catch (error) {
		next(error)
	}
}

exports.getAll = async (req, res, next) => {
	try {
		const {limit, page, search} = req.query
		const professorData = await professorService.getAll(limit, page, search);
		return res.json(professorData)
	} catch (error) {
		next(error)
	}
}