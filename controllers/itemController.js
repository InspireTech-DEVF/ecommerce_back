import Category from "../models/Category.js";
import Item from "../models/Item.js";

const createItem = async (req, res) => {
  try {
    const itemData = req.body;

    if (!itemData.category_id || typeof itemData.category_id !== "string") {
      return res
        .status(400)
        .json({ msg: "Category data is missing or invalid" });
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

const getAllItems = async (req, res) => {
  const queryDb = { isActive: true };

  try {
    const items = await Item.find(queryDb).populate("category_id", "name"); // busque el documento en la colección de categorías que corresponde a category_id y solo incluya el campo name.
    if (!items) {
      return res.status(404).json({ msg: "Item not found" });
    }
    //Mapeo sobre los items para crear un nuevo array itemsWithCategoryName, donde cada item incluye el category_name y opcionalmente se elimina category_id si no lo necesitas en la respuesta final.
    const itemsWithCategoryName = items.map((item) => {
      const itemObject = item.toObject();
      itemObject.category_name = item.category_id.name;
      delete itemObject.category_id; // Opcional: eliminar el campo category_id si no lo necesitas
      return itemObject;
    });

    res.status(200).json(itemsWithCategoryName);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

const getItemById = async (req, res) => {
  if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid item ID" });
  }

  try {
    const item = await Item.findById({
      _id: req.params.itemId,
      isActive: true,
    }).populate("category_id", "name");

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    const itemObject = item.toObject();
    itemObject.category_name = item.category_id.name;
    delete itemObject.category_id;

    res.status(200).json(itemObject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (
      !itemId ||
      typeof itemId !== "string" ||
      !itemId.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return res.status(400).json({ msg: "Invalid item ID" });
    }

    const updatedData = req.body;

    if (updatedData.category_id) {
      const category = await Category.findById(updatedData.category_id);
      if (!category) {
        return res.status(404).json({ msg: "Category not found" });
      }
      updatedData.category_name = category.name;
    }

    const item = await Item.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    }).populate("category_id", "name");

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    const itemObject = item.toObject();
    itemObject.category_name = item.category_id
      ? item.category_id.name
      : updatedData.category_name;
    delete itemObject.category_id;
    res.status(200).json(itemObject);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteItemId = async (req, res) => {
  if (!req.params.itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid item ID" });
  }
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.itemId,
      { isActive: false },
      { new: false }
    );
    if (!item || item.isActive === false) {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

export { createItem, getAllItems, getItemById, updateItemById, deleteItemId };
