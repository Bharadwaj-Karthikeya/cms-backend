import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true, 
    },
  },
  { timestamps: true } 
);

otpSchema.pre('save', async function(next) {
    if (!this.isModified('otp')) {
        return next();
    }

    const salt = 10;
    this.otp = await bcrypt.hash(this.otp, salt);
    
});

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;