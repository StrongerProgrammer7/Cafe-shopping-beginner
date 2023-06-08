const { Op } = require('sequelize');
const Order_model = require('../models/order');
//const sequelize = require('../routes/database');
const errorHadler = require('./utils/errorHandler');

var options_dd_mm_yyyy = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC',
};


var options_hh_mm_ss= {
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

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
                [Op.gte]: getDate_yyyy_mm_dd(req.query.start) + ' ' + getDate_hh_mm_ss(req.query.start)
            }
        


        if(req.query.end)
        {
            if(!query.date)
            {
                query.date ={};
            }
            query.date[Op.lte]= getDate_yyyy_mm_dd(req.query.end) + ' ' + getDate_hh_mm_ss(req.query.end)
        }

        if(req.query.order)
            query.order = +req.query.order
            
        try 
        {

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
            res.status(200).json(orders);
        } catch (error) 
        {
            errorHadler(res,error);
        }
    }

    async create(req,res)
    {
        const
        {
           list
        } = req.body;
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
                    list:list,
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

function getDate_yyyy_mm_dd(date)
{
    return new Date(date).toISOString().slice(0, 10);
}

function getDate_hh_mm_ss(date)
{
    return new Date(date).toISOString().slice(11, 19);
}



module.exports = new Order();