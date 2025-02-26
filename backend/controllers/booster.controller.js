import mongoose from "mongoose";
import { rarityChances } from "../constants/index.js";
import Booster from "../models/booster.model.js";
import Card from "../models/card.model.js";
import User from "../models/user.model.js";

const getRandomCardByRarity = async (rarity) => {
    const cards = await Card.aggregate([
        { $match: { rarity } },
        { $sample: { size: 1 } }
    ]);
    return cards[0] || null;
};

export const openBooster = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(req.user._id).session(session);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const now = new Date();
        const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        if ((user.lastOpened && user.lastOpened >= twentyFourHoursAgo) && !user.isFirstLogin) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "You can only open a booster every 24 hours" });
        }

        if (user.isFirstLogin) {
            user.isFirstLogin = false;
            await user.save({ session });
        }

        const booster = [];
        const rarityPool = Object.entries(rarityChances);

        for (let i = 0; i < 5; i++) {
            let random = Math.random() * 100;
            let accumulatedChance = 0;
            let selectedRarity = "common";

            for (const [rarity, chance] of rarityPool) {
                accumulatedChance += chance;
                if (random <= accumulatedChance) {
                    selectedRarity = rarity;
                    break;
                }
            }

            const card = await getRandomCardByRarity(selectedRarity);
            if (card) booster.push(card);
        }

        const boosterCollection = new Booster({
            user: req.user._id,
            cards: booster.map(card => card._id),
            openedAt: now
        });

        await boosterCollection.save();

        user.collections.push(...booster.map(card => card._id));

        user.lastOpened = now;
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Booster opened successfully",
            boosterId: boosterCollection._id,
            newCards: booster.map(card => card._id)
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return res.status(500).json({ error: "Something went wrong." });
    }
};
