const { Model, DataTypes } = require('sequelize');
const  sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
{
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    references: {
        model: 'user',
        key: 'id'
    }
},
stars: {
    type: DataTypes.INTEGER,
    allowNull: false
},
date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
        isDate: true
    }
},
comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
        len: [10]
    }
}
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName:'review'
}
);

module.exports = Review;
