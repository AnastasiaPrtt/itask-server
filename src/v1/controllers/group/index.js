const groupService = require('../../service/group.service');

exports.register = async (req, res, next) => {
	try {
		const userData = req.user
		if (userData.role !== 'admin') {
			throw ApiError.BadRequest('У вас нет прав администратора')
		}
		const {name} = req.body;
		const groupData = await groupService.create(name)
		return res.json(groupData)
	} catch (error) {
		next(error)
	}
}