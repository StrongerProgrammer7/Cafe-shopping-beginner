
const analytics = async (req,res) =>
{
    res.status(200).json({message:"This analytics!"});
}

const overview = async (req,res) =>
{
    res.status(200).json({message:"This overview!"});
}


module.exports = {analytics,overview};