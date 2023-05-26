const { Sequelize, DataTypes,Model} = require('sequelize');
const sequelize = require('../routes/database');


// class Categories extends Model {};

// Categories.init(
//     {
//         email:
//         {
//             type: DataTypes.STRING(255),
//             allowNull: false,
//             unique: true
//         },
//         password:
//         {
//             type: DataTypes.STRING(255),
//             allowNull: false
//         }
//     },
//     {
        
//         sequelize,
//         modelName: 'Categories'
//     }
// );

// module.exports = sequelize.model('Categories');

// sequelize.sync()
// .then(result=>console.log('Create/Sync table'))
// .catch(e => console.log(e.message));