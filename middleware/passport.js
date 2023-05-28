const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const dotenv =require('dotenv').config();
const db = require('../routes/database');
const User = require('../models/user');

const options =
{
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

module.exports = function(passport)
{
    passport.use(
        new JwtStrategy(options,async (payload,done)=>
        {
            try 
            {
                const user = await User.findByPk(payload.userId,
                    {
                        attributes: ['email','id']
                    });
    
                if(user)
                {
                    done(null,user);
                }else
                {
                    done(null,false);
                }   
            } catch (error) 
            {
                console.log(error.message);
            }
        })
    )
}