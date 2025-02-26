import Card from "../models/card.model.js";

export const getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getCardById = async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.status(200).send(card);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const getCardBySlug = async (req, res) => {
    try {
        const card = await Card.findOne({ slug: req.params.slug });
        res.status(200).send(card);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};