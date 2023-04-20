const sequelize = require('../config/connection');
const { User,  Dish, Review } = require('../models');

const userData = require('./userSeed.json');
const dishData = require('./dishSeed.json');
const reviewData = require('./reviewSeed.json');

const seedDatabase = async () => {
await sequelize.sync({ force: true });

const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

const dishes = [];

for (const dish of dishData) {
    const tempDish = await Dish.create({
        ...dish,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    dishes.push(tempDish);
}

for (const review of reviewData) {
    await Review.create({
        ...review,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        dish_id: dishes[Math.floor(Math.random() * dishes.length)].id,
    });
}

process.exit(0);
};

seedDatabase();