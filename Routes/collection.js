// routes/collectionRoutes.js
import express from 'express';
import {
  createCollection,
  addProductsToCollection,
  getCollectionWithProducts,
  getAllCollections,
} from '../Controllers/collection.js';

const router = express.Router();

router.post("/create", createCollection);
router.put("/add-products/:collectionId", addProductsToCollection);
router.get("/get/:collectionId", getCollectionWithProducts);
router.get("/all", getAllCollections);

export default router;
