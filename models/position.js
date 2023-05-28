const { Sequelize, DataTypes,Model} = require('sequelize');
const sequelize = require('../routes/database');
const Category = require('./category');
const Users = require('./user');

class Positions extends Model {};

Positions.init(
    {
        name:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        cost:
        {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: Category,
                key: 'id'
            }
        },
        user:
        {
            type: DataTypes.INTEGER,
            references:
            {
                model: Users,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Positions'
    }
);

module.exports = sequelize.model('Positions');

sequelize.sync()
.then(result=>console.log('Create/Sync table position'))
.catch(e => console.log(e.message));