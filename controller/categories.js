const controller = require('./controller');
const category = require('../service/categoires');
const upload = require('../middleware/upload');
const passport = require('passport');

controller.post('/category',passport.authenticate('jwt', { session: false }),upload.single('image'),category.create);
controller.get('/category',passport.authenticate('jwt', { session: false }),category.getAll);
controller.get('/category/:id',passport.authenticate('jwt', { session: false }),category.getById);
controller.delete('/category/:id',passport.authenticate('jwt', { session: false }),category.remove);
controller.patch('/category/:id',passport.authenticate('jwt', { session: false }),upload.single('image'),category.update);

module.exports = controller