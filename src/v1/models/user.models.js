const { DataTypes } = require('sequelize')
const sequelize = require('../../../db')

const User = sequelize.define('User', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstName: { type: DataTypes.STRING },
	lastName: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING },
	password: { type: DataTypes.STRING, allowNull: false },
	role: { type: DataTypes.STRING, defaultValue: 'user' },
})

module.exports = User