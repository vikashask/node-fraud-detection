const express = require('express');
const router = express.Router();
const commonMiddleware = require('../middleware/common.middleware');

const orderController = require('../controllers/orderController');

router.get('/get-order/:brandId?', commonMiddleware.getBrandIdValidator, orderController.getOrder);
router.post('/add-order',orderController.postOrder);

module.exports = router;
