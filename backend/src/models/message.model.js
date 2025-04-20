import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {}
)

const Message = mongoose.model("Message", messageSchema);

export default Message;
