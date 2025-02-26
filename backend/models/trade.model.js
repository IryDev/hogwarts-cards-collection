import mongoose from "mongoose";

const tradeRequestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardOffered: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
    cardWanted: { type: mongoose.Schema.Types.ObjectId, ref: "Card", required: true },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, { timestamps: true });

const Trade = mongoose.model("TradeRequest", tradeRequestSchema);

export default Trade;