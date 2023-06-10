const Order_model = require('../models/order');
const errorHadler = require('./utils/errorHandler');

const Analysis = require('./analysis');

class Analytics extends Analysis
{
    constructor()
    {
        super()
    }

    async getAll(req,res)
    {
        try
        {
            const allOrders =  await Order_model.findAll(
                {
                    where:
                    {
                        user:req.user.id
                    },
                    order:[
                        ['order','ASC']
                    ]
                }
            );
            return res.status(200).json(allOrders);
        }catch (e)
        {
            errorHadler(res,e);
        }
    }

   

    async #getOrders(id)
    {
        return await Order_model.findAll(
            {
                where:
                {
                    user:id
                },
                order:[
                    ['order','ASC']
                ]
            }
        );
    }


}



module.exports = new Analytics();