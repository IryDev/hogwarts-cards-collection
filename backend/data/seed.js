import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
import { fantasticBeastsCards, fantasticHumansCards, harryPotterCreaturesCards, harryPotterHumansCards, } from "../constants/cards.js";
import Card from "../models/card.model.js";

mongoose.connect(DB_URI, {}).then(() => console.log("🟢 MongoDB Connected"))
    .catch(err => console.error("🔴 MongoDB Connection Error:", err));


const cards = [...harryPotterHumansCards, ...harryPotterCreaturesCards, ...fantasticHumansCards, ...fantasticBeastsCards]


console.log("🃏 Nombre de cartes à insérer :")
console.log(cards.length)

const insertCards = async () => {
    try {
        await Card.insertMany(cards);
        console.log("✅ Cartes insérées avec succès !");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Erreur lors de l'insertion des cartes :", error);
    }
};

insertCards();