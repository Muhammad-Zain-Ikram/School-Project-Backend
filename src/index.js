import connectMongo from "./db/db.js";
import mongoose from "mongoose";
import { app } from "./app.js";
import 'dotenv/config'
mongoose.set("debug", true);

connectMongo().then(()=>{
  app.listen(process.env.PORT || 3000);
}).catch((err)=>{
  console.log(`MONGODB CONNECTION FAILED: ${err}`)
})
