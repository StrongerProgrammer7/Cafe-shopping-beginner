const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(`${process.env.DATABASE_NAME}`,`${process.env.DATABASE_USER}`, `${process.env.DATABASE_PASSWORD}`,
{
    host: `${process.env.DATABASE_HOST}`,
    dialect: 'mysql',
    logging: console.log
})

module.exports = sequelize;