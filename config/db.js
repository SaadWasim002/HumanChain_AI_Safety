import mongoose from "mongoose";

console.log(process.env.MONGO_URI);

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`\nMongoDB connected , DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
       console.log(`MongoDB connection failed : ${error}`);
       process.exit(1); 
    }
}
export default connectDB;