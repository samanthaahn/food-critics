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

for (const dish of dishData) {
    await Dish.create({
        ...dish,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}
process.exit(0);
};

seedDatabase();