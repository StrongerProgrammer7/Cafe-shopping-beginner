const controller = require('./controller');
const category = require('../service/categoires');

controller.post('/category',category.create);
controller.get('/category',category.getAll);
controller.get('/category/:id',category.getById);
controller.delete('/category/:id',category.remove);
controller.patch('/category/:id',category.update);

module.exports = controller