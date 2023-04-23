const { Model, DataTypes } = require('sequelize');
const  sequelize = require('../config/connection');

class Dish extends Model {}

Dish.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        dish_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        recipe: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        dish_type: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dish'
    }
);

module.exports = Dish;