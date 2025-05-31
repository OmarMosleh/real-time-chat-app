import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import avatar from "../assets/tmpImg.jpg"
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const endMessageRef = useRef(null)



  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unSubscribeFromMessages } = useChatStore();
  const {authUser} = useAuthStore();
  useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeFromMessages();

  },[selectedUser._id, getMessages, subscribeToMessages, unSubscribeFromMessages])

useEffect(()=>{
  endMessageRef.current?.scrollIntoView({behavior: "smooth"})
},[messages])


  if(isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      
      {/* messages part */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message)=>(
          // the ref keeps getting overwritten as React renders each iteration.
          <div key={message._id} className={`chat ${message.senderId === authUser._id? "chat-end" : "chat-start"}`} ref={endMessageRef} >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src={message.senderId === authUser._id ? authUser.profilePic || avatar : selectedUser.profilePic || avatar} alt="profile-pic"  />
                </div>
              </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1 ">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2 block "
                    />
                  )}
                  {message.text && <p>{message.text}</p> }
                </div>
          </div>
        ))}
      </div>


      <MessageInput />
    </div>
  )
};

export default ChatContainer;
