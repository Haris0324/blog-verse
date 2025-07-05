import mongoose from "mongoose";

// Setting up the connection for mongoDB database
export const ConnectDB = async() => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB Connected")
}