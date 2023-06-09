const controller = require('./controller');
const overview = require('../service/overview');
const passport = require('passport');

controller.post('/overview',passport.authenticate('jwt', { session: false }),overview.create);
controller.get('/overview',passport.authenticate('jwt', { session: false }),overview.getAll);

module.exports = controller