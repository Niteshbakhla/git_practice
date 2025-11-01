import mongoose from "mongoose";

const connectDB = async () => {
            try {
                        const connect = await mongoose.connect("mongodb://localhost:27017/expense");
                        if (connect.connection.readyState === 1) {
                                    console.log("Database is connected")
                        }
            } catch (error) {
                        console.log("Db error", error)
            }
}


export default connectDB;