const express = require('express');
const router = express.Router();
const commonMiddleware = require('../middleware/common.middleware');
var validationError = require('../utils/validationError');

const orderController = require('../controllers/orderController');
router.get('/get-order/:brandId?', commonMiddleware.getBrandIdValidator, orderController.getOrder);
router.post('/add-order',validationError.slugValidation, commonMiddleware.postBrandIdValidator,orderController.postOrder);

module.exports = router;
