const controller = require('./controller');
const position = require('../service/position');
const passport = require('passport');

controller.post('/position',passport.authenticate('jwt', { session: false }),position.create);
controller.get('/position/:category_id',passport.authenticate('jwt', { session: false }), position.getByCategoryId);
controller.delete('/position/:id',passport.authenticate('jwt', { session: false }),position.remove);
controller.patch('/position/:id',passport.authenticate('jwt', { session: false }),position.update);

module.exports = controller