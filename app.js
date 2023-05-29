const express = require('express');
const dotenv =require('dotenv').config();
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors'); //если человек на другом домене, мы его обработаем
const morgan = require('morgan'); //Beautifull logger


const router = require('./routes/routes');
const analytics = require('./controller/analytics');
const categories = require('./controller/categories');
const orders = require('./controller/order');
const position = require('./controller/position');

const app = express();
app.use(morgan('dev')); 
app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads',express.static(__dirname + "/uploads"));

app.use('/',router);
app.use('/api',analytics);
app.use('/api',categories);
app.use('/api',orders);
app.use('/api',position);

app.use(passport.initialize());
require('./middleware/passport')(passport);

module.exports = app;