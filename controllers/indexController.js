const controllers = {};
const models = require('../models');

const showFoods = async (req, res) => {
  const page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    let foods = await models.Food.findAll({
      attributes: ['name', 'imagePath', 'price', 'summary'],
      order: [['price', 'ASC']],
    });

    const totalRows = foods.length;

    foods = foods.slice(offset, offset + limit);

    res.locals.foods = foods.map((food, index) => ({
      ...food.dataValues,
      price: food.price.toFixed(2),
      isRight: [2, 3].includes(index)
    }));

    res.locals.pagination = {
      page,
      limit,
      totalRows,
    }

    res.render('index');
  } catch (error) {
    console.log(error);
  }
}

controllers.show = async (req, res) => {
  const a = await models.Reservation.findAll()
  await showFoods(req, res);
}

controllers.reserve = async (req, res) => {
  try {
    const {name, email, message} = req.body;

    await models.Reservation.create({
      name,
      email,
      message,
      checkStatus: true,
    })

    res.locals.message = 'Reservation successfully';
    await showFoods(req, res);
  } catch (error) {
    console.log(error);
  }
}

module.exports = controllers;
