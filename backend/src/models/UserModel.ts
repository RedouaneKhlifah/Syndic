import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please fill the fullName"]
    },
    email: {
        type: String,
        required: [true, "please fill the password"]
    },
    password: {
        type: String,
        required: [true, "please fill the password"]
    },
    role: {
        type: String,
        enum: ["superadmin", "syndic"],
        default: "syndic"
    }
});

const User = mongoose.model("test", UserSchema);

export default User;
