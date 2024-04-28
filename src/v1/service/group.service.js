const db = require('../models')

class groupService {
	async create(name) {
		const group = await db.sequelize.models.groups.create({ name })
		return { group }
	}
}

module.exports = new groupService()