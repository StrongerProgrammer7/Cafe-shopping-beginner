const Order_model = require('../models/order');
const errorHadler = require('./utils/errorHandler');
const moment = require('moment');
const Analysis = require('./analysis');

class Overview extends Analysis
{
    async getInfo_aboutOrders(req,res)
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

            const ordersMap = super._getOrdersMap(allOrders);
            
            const yesterday = moment().add(-1,'d').format('DD.MM.YYYY');
            const yesterdayOrders = ordersMap[yesterday] || [];

            const yesterdayCountOrders = yesterdayOrders.length

            const countOrders = allOrders.length;

            const countDays = Object.keys(ordersMap).length;

            const countOrdersByDay = +(countOrders / countDays).toFixed(2);

            const percentCountOrders = (((yesterdayCountOrders/countOrdersByDay)-1) * 100).toFixed(2); 

            const totalGain = super._calculatePrice(allOrders);

            const gainByDay = totalGain / countDays;

            const gainByYesterday = super._calculatePrice(yesterdayOrders);

            const gainPercent = (((gainByYesterday/Number(gainByDay))-1) * 100).toFixed(2); 

            const compareGain = (gainByYesterday - gainByDay).toFixed(2);

            const compareCountOrders = (yesterdayCountOrders - countOrdersByDay).toFixed(2);

            res.status(200).json(
                {
                    gain:
                    {
                        percent:Math.abs(+gainPercent),
                        compare:Math.abs(+compareGain),
                        yesterday:+gainByYesterday,
                        isHigher: +gainPercent > 0
                    },
                    orders:
                    {
                        percent:Math.abs(+percentCountOrders),
                        compare:Math.abs(+compareCountOrders),
                        yesterday:+yesterdayCountOrders,
                        isHigher: +percentCountOrders > 0
                    }
                }
            )
       } catch (error) 
       {
            errorHadler(res,error);
       }
    }
}



module.exports = new Overview();