const ApiError = require('../../exceptions/api-error')
const courseService = require('../../service/course.service')

exports.create = async (req, res, next) => {
	try {
		const userData = req.user
		if(userData.role !== 'admin'){
			throw ApiError.BadRequest('У вас нет прав администратора')
		}
		const { name, description } = req.body
		const courseData = await courseService.create(name, description)
		return res.json(courseData)
	} catch (error) {
		next(error)
	}
}