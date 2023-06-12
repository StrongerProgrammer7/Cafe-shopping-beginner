const Order_model = require('../models/order');
const errorHadler = require('./utils/errorHandler');

const Analysis = require('./analysis');
const { default: moment } = require('moment');

class Analytics extends Analysis
{
    constructor()
    {
        super()
    }

 

    async getAnalyticsData(req,res)
    {
        try
        {
            const allOrders =  await super._getOrders(req.user.id);
            const ordersMap = super._getOrdersMap(allOrders);

            const totalPrice = super._calculatePrice(allOrders);
            const middleCheck = +(totalPrice / allOrders.length).toFixed(2);

            const chartX = Object.keys(ordersMap).map( label =>
                {
                    const gain = super._calculatePrice(ordersMap[label]);
                    const order = ordersMap[label].length;
                    return { label,order,gain };
                });
             
            return res.status(200).json({middleCheck,chartX});
        }
        catch(error)
        {
            errorHadler(res,error);
        }
    }

}

module.exports = new Analytics();