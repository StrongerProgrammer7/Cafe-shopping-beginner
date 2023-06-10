const controller = require('./controller');
const overview = require('../service/overview');
const passport = require('passport');

controller.get('/overview',passport.authenticate('jwt', { session: false }),overview.getInfo_aboutOrders);

module.exports = controller