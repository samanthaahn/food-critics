const Dish = require('./Dish');
const User = require('./User');
const Review = require('./Review');

Dish.belongsTo(User, {
    foreignKey: 'user_id'
});

Dish.hasMany(Review, {
    foreignKey: 'dish_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { Dish, User, Review };
