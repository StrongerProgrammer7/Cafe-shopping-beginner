const Order_model = require('../models/order');
const sequelize = require('../routes/database');
const errorHadler = require('./utils/errorHandler');
class Order
{
    constructor()
    {

    }

    async getAll(req,res)
    {
        const query = 
        {
            user:req.user.id
        }

        if(req.query.start)
            query.date = 
            {
                [Op.gte]: req.query.start
            }

        if(req.query.end)
        {
            if(!query.date)
            {
                query.date ={};
            }
            query.date['[Op.lte]'] =  req.query.end
        }

        if(req.query.order)
            query.order = +req.query.order
            
        try 
        {
            console.log(req.query);
            const orders = await Order_model.findAll(
                {
                    where:query,
                    offset: +req.query.offset,
                    limit:+req.query.limit,
                    order:[
                        ['date','DESC']
                    ]
                }
            );
            res.status(200).json({success:"true",orders:orders});
        } catch (error) 
        {
            errorHadler(res,error);
        }
    }

     async create(req,res)
    {
        const
        {
            name,
            quantity,
            cost
        } = req.body
        try 
        {
            const lastOrder = await Order_model.findAll(
                {
                    where:
                    {
                        user: req.user.id
                    },
                    order:[
                        ['date','DESC']//[sequelize.fn('max',sequelize.col('date')),'DESC']
                    ]
                }  
            );

            const maxOrder = lastOrder !== undefined && lastOrder.length !== 0 ? lastOrder[0].order : 0;
            const order = await Order_model.create(
                {
                    order:maxOrder + 1,
                    name:name,
                    quantity:quantity,
                    cost:cost,
                    user: req.user.id
                }
            );
            res.status(201).json(order);
        } catch (error) 
        {
            errorHadler(res,error);
        }
    }


}



module.exports = new Order();