const User = require('../models/user');
const {errorHandler} = require('../helpers/dbErrorHandler');
exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(user=>{
        user.hashed_password=undefined;
        user.salt=undefined;
        res.status(200).json(user)
    })
    .catch(err=>res.status(400).json({
        error:errorHandler(err)
    }));
}