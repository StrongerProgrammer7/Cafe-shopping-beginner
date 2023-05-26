const controller = require('./controller');
const order = require('../service/order');

controller.post('/order',order.create);
controller.get('/order',order.getAll);

module.exports = controller