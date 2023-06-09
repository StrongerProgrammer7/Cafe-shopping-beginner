const app = require('./app');
const db = require('./routes/database');
const PORT = process.env.PORT || 4000;

async function startServer()
{
    try
    {
        await db.authenticate()
        .then(()=>console.log("Connection databse has been established succesfully"))
        .catch((e)=> console.log(e.message));
        app.listen(PORT,() => console.log(`Server has been started on the PORT = ${PORT}`))
    }
    catch(e)
    {
        console.log(e.message);
    }
}

startServer();