import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});