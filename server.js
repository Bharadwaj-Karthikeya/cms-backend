import dotenv from "dotenv";
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { testing } from "./cron/testing.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
connectCloudinary();
testing();
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});