const controller = require('./controller');
const order = require('../service/order');
const passport = require('passport');

controller.post('/order',passport.authenticate('jwt', { session: false }),order.create);
controller.get('/order',passport.authenticate('jwt', { session: false }),order.getAll);

module.exports = controller