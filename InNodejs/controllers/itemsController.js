// controllers/itemsController.js
const { getContainer } = require('../config/cosmosClient');

// Create an item
exports.createItem = async (req, res) => {
  try {
    const container = await getContainer();
    const { id, name, description } = req.body;
    const newItem = { id, name, description };

    const { resource: createdItem } = await container.items.create(newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item', details: error.message });
  }
};

// Read all items
exports.getItems = async (req, res) => {
  try {
    const container = await getContainer();
    const { resources: items } = await container.items.query("SELECT * from c").fetchAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items', details: error.message });
  }
};

// Read a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const container = await getContainer();
    const { id } = req.params;
    const { resource: item } = await container.item(id).read();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item', details: error.message });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  try {
    const container = await getContainer();
    const { id } = req.params;
    const { name, description } = req.body;

    const { resource: updatedItem } = await container.item(id).replace({ id, name, description });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item', details: error.message });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const container = await getContainer();
    const { id } = req.params;

    await container.item(id).delete();
    res.status(204).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item', details: error.message });
  }
};
