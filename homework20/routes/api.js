const express = require('express');
const router = express.Router();
const ShoppingList = require('../models/shoppinglist');

router.get('/shoppinglist', (req, res, next) => {
		ShoppingList
		.find({}, 'item')
		.then(data => res.json(data))
		.catch(next)
});

router.post('/shoppinglist', (req, res, next) => {
    if (req.body.item) {
        ShoppingList
            .create(req.body)
            .then(data => res.json(data))
            .catch(next);
    }
    else {
        res.json({ error: "The item field is empty" })
    }
});

router.delete('/shoppinglist/:id', (req, res, next) => {
    ShoppingList.findOneAndDelete({ "_id": req.params.id })
        .then(data => res.json(data))
        .catch(next)
})

module.exports = router;