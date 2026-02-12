import dotenv from "dotenv";
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { testing } from "./cron/testing.js";
import http from "http";
import {Server} from "socket.io"
import { registerSocketHandlers } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
connectCloudinary();
testing();
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true
    }
});

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});