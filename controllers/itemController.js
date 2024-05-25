import Category from "../models/Category.js";
import Item from "../models/Item.js";

const createItem = async (req, res) => {
  try {
    const itemData = req.body;

    if (!itemData.category_id || typeof itemData.category_id !== 'string') {
      return res.status(400).json({ msg: "Category data is missing or invalid" });
    }

    const category = await Category.findById(itemData.category_id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    itemData.category_name = category.name;

    const newItem = await Item.create(itemData);
    const responseItem = newItem.toObject();
    responseItem.category_name = category.name;

    res.status(200).json(responseItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {createItem}