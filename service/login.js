const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req,res) =>
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
            email:email
        }
    }
   );

   if(user===null)
        return res.status(404).json({message:"User not find", status:false});
    
    if(!await bcrypt.compare(password,user.password))
        return res.status(401).json({message:"Not correct password",status:false});
    
    //Cookie
    const data =
    {
        message:"user has been logged in"
    };
    res.status(201).json(data);
}

module.exports = login;