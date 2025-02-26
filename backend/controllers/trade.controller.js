import mongoose from "mongoose";
import Trade from "../models/trade.model.js";
import User from "../models/user.model.js";


export const getTrades = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const userId = await User.findById(req.user._id).session(session);

    try {
        const trades = await Trade.find({ requestedUser: userId, status: "pending" })
            .populate("requester", "username")
            .populate("cardOffered")
            .populate("cardWanted");

        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const requestTrade = async (req, res) => {
    const { requestedUser, cardWanted, cardOffered } = req.body;
    const requester = req.user._id;

    try {
        const sender = await User.findById(requester);
        const receiver = await User.findById(requestedUser);

        if (!sender || !receiver) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        if (!sender.collections.includes(cardOffered)) {
            return res.status(400).json({ message: "Vous ne possédez pas cette carte" });
        }

        // if user doesn't have the card id he wants to trade for
        if (!receiver.collections.includes(cardWanted)) {
            return res.status(400).json({ message: "L'utilisateur ne possède pas cette carte" });
        }

        const tradeRequest = new Trade({ requester, requestedUser, cardOffered, cardWanted });

        await tradeRequest.save();

        res.status(201).json({ message: "Demande d'échange envoyée", trade: tradeRequest });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}