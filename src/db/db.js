import mongoose from "mongoose";
const connectMongo = async () => {
    try {
        console.log(process.env.MONGO_URI)
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB CONNECTED BOSS! AT: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`ERROR: ${error} `);
        process.exit(1)
    }
}
export default connectMongo