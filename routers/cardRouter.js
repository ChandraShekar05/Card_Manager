const express = require('express');
const cardController = require('../controller/cardController.js');

const router = express.Router();
//to fetch all the cards from the table
router.get('/', cardController.getAllCards);

//to fetch the data by id
router.get('/:id', cardController.getCardById);

//to create a new card
router.post('/', cardController.createCard);

//to update the card
router.put('/:id', cardController.updateCard);

//to delete the card
router.delete('/:id', cardController.deleteCard);

module.exports = router;