
class Category
{
    constructor()
    {

    }

    async getAll(req,res)
    {
        res.status(200).json({message:"THIS CAtEGORY"});
    }
    async getById(req,res)
    {

    }
     async create(req,res)
    {

    }
    async update(req,res)
    {

    }
    async remove(req,res)
    {

    }

}



module.exports = new Category();