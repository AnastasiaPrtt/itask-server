const { Sequelize } = require('sequelize');
const db = require('../models')

class groupService {
	async create(name) {
		const group = await db.sequelize.models.groups.create({ name })
		const groupData = await db.sequelize.models.groups.findOne({
			where: { id: group.id },
			include: [{
				model: db.sequelize.models.students,
				as: 'students',
				attributes: [],
				duplicating: false
			}],
			attributes: ['id', 'name', [Sequelize.fn('COUNT', Sequelize.col('students.id')), 'studentCount']],
			group: ['groups.id', 'groups.name']
		})

		return groupData
	}

	async getAll(params) {
		const { page, limit, search } = params

		const queryOptions = {
			where: search ? {
				name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${search.toLowerCase()}%`)
			} : {},
			include: [{
				model: db.sequelize.models.students,
				as: 'students',
				attributes: [],
				duplicating: false
			}],
			attributes: ['id', 'name', [Sequelize.fn('COUNT', Sequelize.col('students.id')), 'studentCount']],
			group: ['groups.id', 'groups.name']
		}

		if (!search) {
			queryOptions.limit = limit;
			queryOptions.offset = (page - 1) * limit;
		}

		const groups = await db.sequelize.models.groups.findAndCountAll(queryOptions);
		const totalGroupsCount = await db.sequelize.models.groups.count()
		return {
			count: totalGroupsCount,
			groups: groups.rows
		}
	}
}



module.exports = new groupService()