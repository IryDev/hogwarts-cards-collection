import mongoose, { Schema } from "mongoose";

const cardSchema = new Schema({
    name: { type: String, required: true, trim: true, minLength: 3, maxLength: 64 },
    slug: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["Human", "Creature"], required: true },
    saga: { type: String, enum: ["Harry Potter", "Fantastic Beasts"], required: true },
    house: { type: String, enum: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "Neutral"], default: "Neutral" },
    image: { type: String, required: true, trim: true },
    rarity: { type: String, enum: ["Common", "Uncommon", "Rare", "Epic", "Legendary"], required: true },
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);

export default Card;
