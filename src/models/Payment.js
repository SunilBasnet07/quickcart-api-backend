import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    totalAmount: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash", "online", ""]
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: "true"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionId:String 
})

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;