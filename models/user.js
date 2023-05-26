const { Sequelize, DataTypes,Model} = require('sequelize');
const sequelize = require('../routes/database');


class Users extends Model {};

Users.init(
    {
        email:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password:
        {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        
        sequelize,
        modelName: 'Users'
    }
);

module.exports = sequelize.model('Users');

sequelize.sync()
.then(result=>console.log('Create/Sync table'))
.catch(e => console.log(e.message));