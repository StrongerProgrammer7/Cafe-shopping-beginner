const { Sequelize, DataTypes,Model, literal} = require('sequelize');
const sequelize = require('../routes/database');
const Users = require('./user');

class Orders extends Model {};

Orders.init(
    {
        date:
        {
            type: DataTypes.DATE,
            allowNull: true,
            unique: true,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        order:
        {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        // list:
        // {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     //name:str,quantity:int,cost:int
        //     get()
        //     {
        //         return this.getDataValue('list').split(';');
        //     },
        //     set(value)
        //     {
        //         let data = this.getDataValue('list');
        //         data += value + ';';
        //         this.setDataValue('list',data);
        //     }
        // },
        name:
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        quantity:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cost:
        {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        modelName: 'Orders'
    }
);

// Team.hasMany(Player, {
//     foreignKey: 'clubId'
//   });
//   Player.belongsTo(Team);

module.exports = sequelize.model('Orders');

sequelize.sync()
.then(result=>console.log('Create/Sync table Orders'))
.catch(e => console.log(e.message));