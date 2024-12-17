import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    student :{
        type: String,
        required : true,
        lowercase: true
        },
    phone_numbe:{
        type: String
    },
    date_of_birth:{
        type: String,
        required: true
    }
    },
    {timestamps: true, autoIndex : true}
)
export const User = mongoose.model("User", userSchema)