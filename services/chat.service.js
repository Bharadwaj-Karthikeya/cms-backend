import Chat from "../models/chat.js";
import thread from "../models/thread.js";

export const getChatsByThreadService = async (threadId) => {
    return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({createdAt: -1});
}

export const sendChatService = async ({
    receiverId, 
    senderId, 
    message
}) => {
    
    const newThread = await findOrCreateThreadService(receiverId, senderId);

    const newChat = await Chat.create({
        thread: newThread._id,
        sender: senderId,
        message: message
    });

    newThread.lastMessage = message;
    newThread.lastMessagesAt = newChat.createdAt;
    await newThread.save();

    return newChat;
}

export const findOrCreateThreadService = async (userId1, userId2) => {
    console.log("Finding or creating thread for users");
 
    const cparticipants = [userId1, userId2].sort();
    console.log("Checking for existing thread with participants");

    let existingThread = await thread.findOne({
        participants: { $all: cparticipants },
        $expr: { $eq: [ { $size: "$participants" }, 2 ] }
    });

    if (!existingThread) {
        existingThread = await thread.create({
            participants: cparticipants
        });
    }

    return existingThread;
}