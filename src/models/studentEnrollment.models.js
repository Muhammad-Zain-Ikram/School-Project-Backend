import mongoose, { Schema } from "mongoose";
import {AcademicSession} from "./academicSession.models.js"
import { Student } from "./studetnt.models.js";

const studentEnrollmentSchema = new Schema(
    {
        name : {
            type : String,
            required: true
        },
        fatherName : {
            type : String,
            required: true
        },
        phoneNumber : {
            type : String
        },
        class: [
           { 
            type : Schema.Types.ObjectId,
            ref: "Grade",
            required : true
            }
        ],
        startSession : {
            type : Schema.Types.ObjectId,
            ref : "AcademicSession",
        },
        endSession : {
            type : Schema.Types.ObjectId,
            ref : "AcademicSession",
        },
    }
)

studentEnrollmentSchema.pre("save", async function(next) {
    const CurrentSession = await AcademicSession.findOne({ status: "Current" });
    this.startSession = CurrentSession._id;
    next();
  });

studentEnrollmentSchema.pre("save", async function(next){
    await Student.create({studentId: this._id, currentClass : this.class, currentSession : this.startSession})
    next()
})

studentEnrollmentSchema.statics.deleteStudent = async function(id) {
    const CurrentSession = await AcademicSession.findOne({ status: "Current" });
    await this.findByIdAndUpdate(id, { $set: { endSession: CurrentSession } });
    await Student.findOneAndDelete({studentId : id})
};

export const StudentEnrollment =  mongoose.model("StudentEnrollment", studentEnrollmentSchema)