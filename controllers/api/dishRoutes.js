const router = require("express").Router();
const { Dish, User, Review } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// GET all dishes-ok
router.get("/", async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      include: [{ model: User }, { model: Review }],
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

const path = require('path');

   
// Add this new route to serve the dish review page with dish names
router.get("/dish-review", async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      attributes: ["id", "dish_name"],
    });

    const dishes = dishData.map((dish) => dish.get({ plain: true }));

    res.render("dishreview", { dishes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all distinct categories -ok
router.get("/categories", async (req, res) => {
  try {
    const categories = await Dish.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("category")), "category"],
      ],
    });
    res
      .status(200)
      .json(categories.map((category) => category.category));
  } catch (err) {
    res.status(500).json(err);
  }
});

//test script
router.get("/test", async (req, res) => {
  try {
    const dishData = await Dish.findAll();
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all distinct dish types-okj
router.get("/dish_type", async (req, res) => {
  try {
    const dishTypes = await Dish.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("dish_type")), "dish_type"],
      ],
    });
    res.status(200).json(dishTypes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all dishes without includes (for the dropdown list)
router.get("/simple", async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      attributes: ["dish_type"],
      group: "dish_type",
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single dish by id
router.get("/:id", async (req, res) => {
  try {
    const dishData = await Dish.findByPk(req.params.id, {
      include: [{ model: User }, { model: Review }],
    });

    if (!dishData) {
      res.status(404).json({ message: "No dish found with that id!" });
      return;
    }

    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add this new route to fetch dish names
router.get("/names", async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      attributes: ['id', 'dish_name'],
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      attributes: ['id', 'dish_name']
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new dish 
router.post("/", async (req, res) => {
  console.log('=======================================');
  console.log(req.body);
  console.log('=======================================');

  try {
    const newDish = await Dish.create({
      ...req.body,
      dish_type: req.body.dish_type,
      user_id: req.session.user_id,
    });

    res.status(201).json(newDish);
  } catch (err) {
    console.error("Error in POST /:", err);
    res.status(400).json({ message: "Bad Request", error: err });
  }
});

// PUT to update a dish by id (withAuth middleware for authentication)
router.put("/:id", withAuth, async (req, res) => {
  try {
    const dishData = await Dish.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!dishData) {
      res.status(404).json({ message: "No dish found with that id!" });
      return;
    }

    res.status(200).json(dishData);
  } catch (err) {
    console.error("Error in PUT /:id:", err);
    res.status(400).json({ message: "Bad Request", error: err });
  }
});

// DELETE a dish by id (withAuth middleware for authentication)
router.delete("/:id", async (req, res) => {
  try {
    const dishData = await Dish.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dishData) {
      res.status(404).json({ message: "No dish found with that id!" });
      return;
    }

    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
