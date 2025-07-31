// models/Collection.js
import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  productIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ],
  image:{type:String}
}, { timestamps: true });

export default mongoose.model("Collection", collectionSchema);
