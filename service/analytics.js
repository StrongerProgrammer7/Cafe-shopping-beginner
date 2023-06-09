const Order_model = require('../models/order');
const errorHadler = require('./utils/errorHandler');
const moment = require('moment');
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

    async create(req,res)
    {
       
    }

    async getInfo_yesterdayOrder(req,res)
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
            const ordersMap = this._getOrdersMap(allOrders);

            const yesterdayOrders = ordersMap[moment().add(-1,'d').format('DD.MM.YYYY')] || [];

            const yesterdayCountOrders = yesterdayOrders.length

            const countOrders = allOrders.length;

            const countDays = Object.keys(ordersMap).length;

            const countOrdersByDay = +(countOrders / countDays).toFixed(2);

            const percentCountOrders = (((yesterdayCountOrders/countOrdersByDay)-1) * 100).toFixed(2); 

            const totalGain = this._calculatePrice(allOrders);

            const gainByDay = totalGain / countDays;

            const gainByYesterday = this._calculatePrice(yesterdayOrders);

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