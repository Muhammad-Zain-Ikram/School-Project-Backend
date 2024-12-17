import mongoose, { Schema } from "mongoose";
import {Grade} from "./grade.models.js"
const studentSchema = new Schema({
    studentId: {
        type : Schema.Types.ObjectId,
        ref: "StudentEnrollment",
        required : true
    },
    currentSession: {
        type : Schema.Types.ObjectId,
        ref: "AcademicSession",
        required : true
    },
    currentClass:  {
        type : Schema.Types.ObjectId,
        ref: "Grade",
        required : true
    }
})

studentSchema.pre("update", async function(next){
    if (!this.isModified("currentSession")) next()
    const currentLevel = await Grade.findById(this.currentClass)
    const nextLevel = currentLevel.level + 1;
    const newLevel = await Grade.find({level: nextLevel})

    if (!newLevel) {
        const StudentModel = mongoose.model("Student")
        await StudentModel.findByIdAndDelete(this._id)
    }
    else if (newLevel.length == 1)
         this.currentClass = newLevel[0]._id
    else{
        const currentSection = currentLevel.label.split('-')[1]
        const newSecton = `${nextLevel}-${currentSection}`
        const newClass = await Grade.findOne({label : newSecton})
        this.currentClass = newClass.id
    }

    next()
})

export const Student = mongoose.model("Student", studentSchema);