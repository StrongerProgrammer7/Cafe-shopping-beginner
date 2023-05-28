const { Sequelize, DataTypes,Model} = require('sequelize');
const sequelize = require('../routes/database');
const Users = require('./user');

class Categories extends Model {};

Categories.init(
    {
        name:
        {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        imageSrc:
        {
            type: DataTypes.STRING,
            allowNull:true,
            defaultValue:''
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
        modelName: 'Categories'
    }
);

// Team.hasMany(Player, {
//     foreignKey: 'clubId'
//   });
//   Player.belongsTo(Team);

module.exports = sequelize.model('Categories');

sequelize.sync()
.then(result=>console.log('Create/Sync table Categories'))
.catch(e => console.log(e.message));