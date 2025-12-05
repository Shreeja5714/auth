import mongoose from "mongoose";

//defining scheme
const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true
    },
    password: {
        type: String, required: true, trim: true
    },
    tc: {
        type: Boolean, required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;