let User = require('../../models/user');
const dashboard = async (req,res) => {
    let id = req.userId;
    let user = await User.findOne({where:{id:id}})
    res.status(200).json({msg:'Welcome '+user.name})
}
module.exports = {
    dashboard
}