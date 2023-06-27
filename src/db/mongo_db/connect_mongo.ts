import mongoose from "mongoose";



async function connect(url: string) {
    let environment = process.env.ENVIRONMENT
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(`MongoDB connection error: ${err}`);
    }
}

export default connect;