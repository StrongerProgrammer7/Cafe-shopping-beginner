const login = async (req,res) =>
{
    res.status(200).json(
        {
            login:
            {
                email:req.body.email
            }
        }
    )
}

module.exports = login;