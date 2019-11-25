const express = require('express');
const router = express.Router();

// const userRoutes = require('./user/user.routes');
const orderRoutes = require('./order.routes');

var app = express();

router.use('/order', orderRoutes);
module.exports = router;
