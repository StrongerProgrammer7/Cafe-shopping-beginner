const Categories = require('../models/category');
const Position = require('../models/position');
const errorHadler = require('./utils/errorHandler')
class Category
{
    constructor()
    {

    }

    async getAll(req,res)
    {
        try 
        {
            const categories = await Categories.findAll(
                {
                    where:
                    {
                        user: req.user.id
                    }
                }
            );
            res.status(200).json({success:"True",categories:categories});
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
    async getById(req,res)
    {
        try 
        {
            const category = await Categories.findByPk(req.params.id);
            res.status(200).json({success:"true",category:category});
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
     async create(req,res)
    {
        const 
        {
            name
        } = req.body;
        try 
        {
           const category = await Categories.create(
            {
                name:name,
                imageSrc:req.file? req.file.path : '',
                user: req.user.id
            }
           );

           res.status(201).json(category);
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
    async update(req,res)
    {
        const updated =
        {
            name:req.body.name
        }
        if(req.file)
        {
            updated.imageSrc = req.file.path
        }
        try 
        {
            const category = await Categories.update(
                {
                    name:updated.name,
                    imageSrc:updated.imageSrc
                    // user:req.user.id
                },
                {
                    where:
                    {
                        id:req.params.id
                    }
                }
            );
            res.status(200).json(category);
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }
    async remove(req,res)
    {
        try 
        {
            await Categories.destroy(
                {
                    where:
                    {
                        id:req.params.id
                    }
                }
            );
            await Position.destroy(
                {
                    where:
                    {
                        category: req.params.id
                    }
                }
            );
            res.status(200).json({success:"true",message:"Category and postitons deleted"});
        } catch (error) 
        {
            errorHadler(res,error);    
        }
    }

}



module.exports = new Category();