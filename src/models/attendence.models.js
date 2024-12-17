import mongoose, { Schema } from "mongoose";

const attendenceSchema = new Schema(
    {
        attendeId : {
            type : Schema.Types.ObjectId,
            required : true,
            refPath : "reference"
        },
        reference : {
            type : String,
            required : true,
            enum : ["StudentEnrollment", "Staff"]
        },
        type : {
            type: String,
            required : true
        },
        status : {
            type : String
        },
        date: {
            type: Date,
            default: new Date().toISOString().split('T')[0]
          }
    }
);

attendenceSchema.index({Date : 1});

export const Attendence = mongoose.model("Attendence", attendenceSchema)