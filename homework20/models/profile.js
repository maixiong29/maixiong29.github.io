const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ShoppingListSchema = new Schema({ 
	item: { 
		type: String, 
		required: [true, 'The text field is required'] 
	} 
})

const ShoppingList = mongoose.model('shoppinglist', ShoppingListSchema);

module.exports = ShoppingList;