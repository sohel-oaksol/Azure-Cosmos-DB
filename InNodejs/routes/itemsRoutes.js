// routes/itemsRoutes.js
const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.post('/', itemsController.createItem);           // Create an item
router.get('/', itemsController.getItems);              // Get all items
router.get('/:id', itemsController.getItemById);        // Get an item by ID
router.put('/:id', itemsController.updateItem);         // Update an item by ID
router.delete('/:id', itemsController.deleteItem);      // Delete an item by ID

module.exports = router;
