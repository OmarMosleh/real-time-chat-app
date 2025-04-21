import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,//This tells Mongoose that senderId will store an ObjectId, which is the unique identifier of a document in MongoDB.
            ref:"User",// This establishes a reference (or relationship) to another collection—the "User" collection.
            required: true,
        },
        receiverId: {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text:{
            type: String,
        },
        image:{
            type: String,
        }
    },
    {timestamps: true}
)

const Message = mongoose.model("Message", messageSchema);

export default Message;
