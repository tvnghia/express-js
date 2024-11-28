const express = require('express');
const router = express.Router();

const controllers = require('../controllers/indexController.js');

router.get('/', controllers.show);
router.post('/', controllers.reserve);

module.exports = router;
