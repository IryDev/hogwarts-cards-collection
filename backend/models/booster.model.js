import mongoose, { Schema } from "mongoose";

const boosterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Card",
        required: true
    }],
    openedAt: {
        type: Date,
        default: Date.now
    }
});

const Booster = mongoose.model("Booster", boosterSchema);

export default Booster;
