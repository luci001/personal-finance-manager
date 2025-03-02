import mongoose from "mongoose";
import validator from "validator";

// User Schema Model - (Name, email, password, creation Date) with validation rules
//new mongoose.Schema({feild1:{type:dtype,contraint:value},feild2:{type:dtype,contraint:value}})
//CREATE TABLE USER(name varchar(25) notnull)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique : true,
        validate : validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength : [6, "Password Must Be Atleast 6 characters"],
    },
    phone: { 
        type: String,
        required: [true, "Phone No. is required"]
    },
    dob: {
        type:Date,
        required: [true, "DOB is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"]
    },
    termsAccepted:  { 
        type: Boolean,
        required: [true, "Terms and conditions is required"]
    },
    transactions: {
        type: [],
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
});



const User = mongoose.model("User", userSchema);

export default User;