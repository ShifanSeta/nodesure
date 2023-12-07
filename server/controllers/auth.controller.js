import User from '../models/user.js'

export const register = async (req, res, next) => {
    try {

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            dob: req.body.dob,
            mobile: req.body.mobile
        });

        await newUser.save();
        return res.status(200).send("user has been created");

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res, next) => {
    if(!req.body || req.body && !req.body.username){
        return res.status(404).json({"success":false,"message":'Please send username to proceed.'});
    }else if(!req.body || req.body && !req.body.password){
        return res.status(404).json({"success":false,"message":'Please send password to proceed.'});
    }
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) return res.status(404).json({"success":false,"message":'user not found'});
   
        const isPasswordCorrect = req.body.password !== user.password ? false : true;
        
        if(!isPasswordCorrect) return res.json(404, {"success":false,"message":'Password not matching.'});

        const {password, isAdmin, ...otherDetails } = user._doc;
        return res.status(200).json({status:true,message:"Login Successful.",...otherDetails})
    } catch (error) {
        return res.json(error.status, {status:false, message: error.message || "Something went wrong."});
    }
}