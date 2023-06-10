const controller = require('./controller');
const analytics = require('../service/analytics');
const passport = require('passport');

controller.get('/analytics',passport.authenticate('jwt', { session: false }),analytics.getAll);

module.exports = controller