const Order_model = require('../models/order');
const moment = require('moment');

class Analysis
{

    _getOrdersMap(orders = [])
    {
        const daysOrders = {};
        orders.forEach(order =>
            {
                const date = moment(order.date).format('DD.MM.YYYY');

                if(date === moment().format('DD.MM.YYYY'))
                {
                    return;
                }
                if(!daysOrders[date])
                {
                    daysOrders[date] = [];
                }
                daysOrders[date].push(order);
            });
        return daysOrders;
    }

    _calculatePrice(orders = []) 
    {
        return orders.reduce((total,order)=>
        {   
            let list = getArrayFromString(order.list);
            const orderCost = list.reduce(
                (/** @type {number} */ orderTotal,/** @type {{ cost: number; count: number; name: stirng }} */ item) => 
                {
                    return orderTotal += item.cost * item.count;
                },0
            );
            return total += orderCost;
        },0)
    }

    async _getOrders(id)
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

function getArrayFromString(list = '')
{
    return JSON.parse(list);
}

module.exports = Analysis;