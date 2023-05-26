const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req,res) =>
{
    const
    {
        email,
        password
    } = req.body;

    const user = await User.findOne(
        {
            where:
            {
                email: email
            }
        });
    if (user !== null)
       return res.status(409).json({message: "user has been registered"});

    bcrypt.genSalt(10,function(err,salt)
    {
        bcrypt.hash(password,salt,async (err,hashPass)=>
        {
            try
            {
                const user = await User.create(
                    {
                        email:email,
                        password: hashPass
                    }
                );
                return res.status(201).json({message:"create user", users:user});
            }
            catch(e)
            {
                console.log(e.message);
            }
        });
    });

    
}

module.exports = register;