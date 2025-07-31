// controllers/collectionController.js
import Collection from "../Models/Collection.js";
import { Product } from "../Models/Product.js";

export const createCollection = async (req, res) => {
  try {
    const { name, description,image } = req.body;
    const collection = await Collection.create({ name, description,image });
    res.status(201).json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addProductsToCollection = async (req, res) => {
  try {
    const { productIds } = req.body;
    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      { $addToSet: { productIds: { $each: productIds } } }, // prevent duplicates
      { new: true }
    );
    res.json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCollectionWithProducts = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId).populate("productIds");
    res.json({ success: true, collection });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find().populate("productIds");
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
