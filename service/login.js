const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');

const generation_token = function(id,email)
{
    const data =
    {
        email,
        id
    };
    return jwt.sign(data,`${process.env.JWT_SECRET}`,
    {
        expiresIn: process.env.JWT_EXPIRES
    });
}

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
    const token = generation_token(user.id,email);
    const cookies_option =
    {
        expiresIn: 60*60,
        httpOnly:true
    }
    const data =
    {
        tokens: 'Bearer ' + token,
        cookies: cookies_option,
        message:"user has been logged in"
    };
    res.status(200).json(data);
}

module.exports = login;