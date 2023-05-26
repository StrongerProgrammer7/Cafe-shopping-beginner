const controller = require('./controller');

const analytics = require('../service/analytics').analytics;
const overview = require('../service/analytics').overview;

controller.get('/overview',overview);
controller.get('/analytics',analytics);

module.exports = controller