import { sendChatService } from "../services/chat.service.js"

export const registerSocketHandlers = (io) => {

    const onlineUsers = new Map();

    io.on("connection", (socket) => {
        
        console.log("User connected:", socket.id);

        socket.on("user-online", (userId) => {

            onlineUsers.set(userId, socket.id);
            
            console.log("Online Users:", onlineUsers);
            
        });

        socket.on("send-message", async (data) => {
            
            try {
                const { receiverId, senderId, message } = data;

                if (!receiverId || !senderId || !message) {
                    console.error("Validation Error: receiverId, senderId, and message are required to send a message");
                    return;
                }

                const chat = await sendChatService({
                    receiverId, 
                    senderId, 
                    message
                });

                const receiverSocketId = onlineUsers.get(receiverId);
                
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive-message", chat);
                }

                socket.emit("message-sent", chat);
            } catch (error) {
                console.error("Send Message Error:", error.message);
                socket.emit("error", { message: "Failed to send message" });
            }
        });

        socket.on("disconnect", () => {
                
            for (let [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }

            console.log("User disconnected:", socket.id);
        });

    });
};