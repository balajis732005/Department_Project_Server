import User from "../model/userModel.model.js";

const register = async(req,res) => {
    try {
        const newUser = req.body;
        const registerResult = await User.create(newUser);
        const jwtToken = registerResult.createJwt();
        res.send({
            status: true,
            message: "Account Created Succesfully",
            data: registerResult,
            jwtToken: jwtToken
        })
    } catch(error) {
        console.log(error);
        res.send({
            status: false,
            message: "Failed to Create Account"
        })
    }
};

const login = async(req,res) => {
    try {
        const authUser = req.body;
        const userInDb = await User.findOne({email: authUser.email});
        if(userInDb){
            const isPasswordMatch = await userInDb.comparePassword(authUser.password);
            if(isPasswordMatch){
                const jwtToken = userInDb.createJwt();
                res.send({
                    status: true,
                    message: "Login Succesfull!",
                    jwtToken: jwtToken
                })
                return;
            }
        }
        res.send({
            status: false,
            message: "Invalid Login Credentials"
        })
    } catch(error) {
        console.log(error);
        res.send({
            status: false,
            message: "Falied to Login"
        })
    }
};

export default {register,login};