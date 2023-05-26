const controller = require('./controller');
const position = require('../service/position');

controller.post('/position',position.create);
controller.get('/position/:category_id',position.getByCategoryId);
controller.delete('/position/:id',position.remove);
controller.patch('/position/:id',position.update);

module.exports = controller