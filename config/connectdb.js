import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "authDB"
        };
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed:", error);
    };
};

export default connectDB;