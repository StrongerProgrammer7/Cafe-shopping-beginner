const Position_model = require('../models/position');
const errorHadler = require('../service/utils/errorHandler')
class Position
{
    constructor()
    {

    }

    async getByCategoryId(req,res)
    {
        try 
        {
            const positions = await Position_model.findAll(
                {
                    where:
                    {
                        category:req.params.category_id,
                        user: req.user.id
                    }
                }
            );
            res.status(200).json(positions);

        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }

    async create(req,res)
    {
        try 
        {
            const
            {
                name,
                cost,
                categoryId
                
            } = req.body;
            const position = await Position_model.create(
                    {
                        name: name,
                        cost: cost,
                        category:categoryId,
                        user: req.user.id
                    }
                );
            return res.status(201).json({message:"create position", position:position});  
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
    async remove(req,res)
    {
        try 
        {
            await Position_model.destroy(
                {
                    where:
                    {
                        id:req.params.id
                    }
                }
            );
        return res.status(201).json({message:"delete position "});  
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
    async update(req,res)
    {
        try 
        {
            const
            {
                name,
                cost,
                categoryId
            } = req.body;
            const position = await Position_model.update(
                {
                    name:name,
                    cost:cost,
                    category:categoryId,
                    user:req.user.id
                },
                {
                    where:
                    {
                        id:req.params.id
                    }
                }
            )
            return res.status(201).json({message:"update position "});  
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }


}



module.exports = new Position();