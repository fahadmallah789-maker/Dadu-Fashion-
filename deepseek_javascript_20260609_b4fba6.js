// backend/controllers/categoryController.js
const Category = require('../models/Category');
const Product = require('../models/Product');

const getCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.json(categories);
};

const createCategory = async (req, res) => {
  const slug = req.body.name.toLowerCase().replace(/ /g, '-');
  const category = await Category.create({ ...req.body, slug });
  res.status(201).json(category);
};

const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  Object.assign(category, req.body);
  await category.save();
  res.json(category);
};

const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  await category.deleteOne();
  res.json({ message: 'Category deleted' });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };