import mongoose , {Schema} from "mongoose";

const timeTableSchema = new Schema ({
    teacherId :{
        type : Schema.Types.ObjectId,
        ref : "Staff",
        required : true
    },
    day : {
        type : String,
        required: true,
        enum : ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    },
    classId : {
        grade: {
          type : Schema.Types.ObjectId,
          ref: "Grade",
          required : true
        },
         time : {
            type: String,
            required: true
        }
    }
})

export const TimeTable = mongoose.model("TimeTable", timeTableSchema)