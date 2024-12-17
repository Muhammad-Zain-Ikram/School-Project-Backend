import mongoose, { Schema} from "mongoose";
import {Student} from "./studetnt.models.js"
const academicSessionSchema = new Schema({
    label : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
    }
});

academicSessionSchema.pre("save", async function(next){
    const AcademicSessionModel = mongoose.model('AcademicSession');
    await AcademicSessionModel.findOneAndUpdate({status : "Current"},{$set :{status : "Ended"}})
    Student.updateMany({$set : {currectSession : this._id}})
    next()
})

export const AcademicSession = mongoose.model("AcademicSession", academicSessionSchema);