import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  profilePic: {
    type: String,
    default: "",
  },
},
{timestamps: true}
);

const User = mongoose.model("User", userScheme); // first argument should be singular and upper case -- it will be converted to users

export default User;
