const express = require('express');
const dotenv =require('dotenv').config();

const route = require('./routes/routes');
const controller = require('./controller/controller');

const app = express();
app.use(express.json());
app.use("/css",express.static(__dirname + "/public/css"))
app.use("/js",express.static(__dirname + "/public/js"))

app.use('/',route);
app.use('/api',controller);
const PORT = process.env.PORT || 5000

async function startServer()
{
    try
    {
        app.listen(PORT,() => console.log(`Server has been started on the PORT = ${PORT}`))
    }
    catch(e)
    {
        console.log(e.message);
    }
}

startServer();