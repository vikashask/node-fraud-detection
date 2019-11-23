const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// const userRoutes = require('./user/user.routes');
const orderRoutes = require('./order.routes');

var app = express();
app.set('secrectKey', 'fraud'); // secret variable

// route middleware to authenticate and check token
// router.use(function (req, res, next) {
// 	// check header or url parameters or post parameters for token
// 	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
// 	// decode token
// 	if (token) {
// 		// verifies secret and checks exp
// 		jwt.verify(token, app.get('secrectKey'), function (err, decoded) {
// 			if (err) {
// 				return res.json({
// 					success: false,
// 					message: 'Failed to authenticate token.'
// 				});
// 			} else {
// 				// if everything is good, save to request for use in other routes
// 				req.decoded = decoded;
// 				next();
// 			}
// 		});
// 	} else {
// 		// if there is no token return an error
// 		return res.status(403).send({
// 			success: false,
// 			message: 'No token provided.'
// 		});
// 	}
// });

router.use('/profile', orderRoutes);
module.exports = router;
