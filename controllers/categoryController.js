import Category from "../models/Category.js";

const createCategory = async (req, res) => {
  try {
    const CategoryData = req.body;

    if (!CategoryData) {
      return res.status(400).json({ msg: "Category data is missing" });
    }

    const newCategory = await Category.create(CategoryData);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all
const getAllCategories = async (req, res) => {
  const queryDb = { isActive: true };

  try {
    const categories = await Category.find(queryDb);

    if (!categories) {
      return res.status(404).json({ msg: "Categories not found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

//getById
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById({
      _id: req.params.categoryId,
      isActive: true,
    });
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategoryById = async (req, res) => {
  if (!req.params.categoryId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: "Invalid category ID" });
  }

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
      }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategoryById = async function (req, res) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { isActive: false },
      { new: false }
    );

    if (!category || category.isActive === false) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(204).json({msg: "Category deleted"});
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
