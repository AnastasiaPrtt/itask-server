const db = require('../models')

class courseService {
	async create(name, description){
		const userData = req.user
		if (userData.role !== 'admin') {
			throw ApiError.BadRequest('У вас нет прав администратора')
		}
		const course = await db.sequelize.models.courses.create({name, description})
		return {course}
	}
}

module.exports = new courseService()