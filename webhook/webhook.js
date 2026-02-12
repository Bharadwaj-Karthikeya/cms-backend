import express from "express";

const router = express.Router();

router.post("/test", (req, res) => {
  console.log("Test webhook received");
  console.log("Request body:", req.body);
  res.status(200).json({
    received: true, 
    message: "Webhook received successfully"
  });
});

export default router;