import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userModel = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator: validator.isEmail
        },
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
})

userModel.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

userModel.methods.createJwt = function() {
    return jwt.sign(
        {userId: this._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES}
    )
}

userModel.methods.comparePassword = async function(candidate) {
    return await bcryptjs.compare(candidate, this.password);
}

export default mongoose.model("User",userModel);