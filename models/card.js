const db = require('../config/db');

class Card {

    // Fetch all cards from the database
    static fetchAll() {
        return db.execute('SELECT * FROM cards');
    }

    // Fetch a card by its ID
    static findById(id) {
        return db.execute('SELECT * FROM cards WHERE id = ?', [id]);
    }

    // Create a new card
    static create(card) {
        const { card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country } = card;
        if (!card_number || !cardholder_name || !card_type || !expiration_date || !cvv || !bank_name || !issuing_country) {
            throw new Error('All fields are required');
        }

        return db.execute('INSERT INTO cards (card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country])
            .catch(err => {
                throw new Error(err);
            });
    }


    // Update a card by its ID
    static update(id, card) {
        const { card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country } = card;

        if (!card_number || !cardholder_name || !card_type || !expiration_date || !cvv || !bank_name || !issuing_country) {
            throw new Error('All fields are required');
        }

        return db.execute('UPDATE cards SET card_number = ?, cardholder_name = ?, card_type = ?, expiration_date = ?, cvv = ?, bank_name = ?, issuing_country = ? WHERE id = ?', 
            [card_number, cardholder_name, card_type, expiration_date, cvv, bank_name, issuing_country, id]);
    }

    // Delete a card by its ID
    static delete(id) {
        return db.execute('DELETE FROM cards WHERE id = ?', [id]);
    }
}

module.exports = Card;