const Card = require('../models/card');

// Helper function to validate card details
const validateCardDetails = (card) => {
    const { card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country } = card;
    if (!card_number || !cardholder_name || !card_type || !expiration_date || !cvv || !bank_name || !issuing_country) {
        return 'All fields are required';
    }
    if (!/^\d{16}$/.test(card_number)) {
        return 'Card number must be 16 digits';
    }
    if (!/^\d{3}$/.test(cvv)) {
        return 'CVV must be 3 digits';
    }
    if (new Date(expiration_date) <= new Date()) {
        return 'Expiration date must be in the future';
    }
    return null;
};

// functions to fetch card details from the database
exports.getAllCards = async (req, res) => {
    try {
        const [cards] = await Card.fetchAll();
        res.status(200).json(cards);
    } catch (err) {
        console.error('Error fetching cards:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// functions to fetch card details by id from the database
exports.getCardById = async (req, res) => {
    try {
        const [card] = await Card.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (err) {
        console.error('Error fetching card:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// functions to create card details in the database
exports.createCard = async (req, res) => {
    try {
        const cardDetails = req.body;
        const validationError = validateCardDetails(cardDetails);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        await Card.create(cardDetails);
        res.status(201).json({ message: 'Card created' });
    } catch (err) {
        console.error('Error creating card:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// functions to update card details in the database
exports.updateCard = async (req, res) => {
    try {
        const cardDetails = req.body;
        const validationError = validateCardDetails(cardDetails);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        await Card.update(req.params.id, cardDetails);
        res.status(200).json({ message: 'Card updated' });
    } catch (err) {
        console.error('Error updating card:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};

// functions to delete card details from the database
exports.deleteCard = async (req, res) => {
    try {
        await Card.delete(req.params.id);
        res.status(200).json({ message: 'Card deleted' });
    } catch (err) {
        console.error('Error deleting card:', err); // Log the error
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};