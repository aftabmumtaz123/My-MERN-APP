const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    pName: { type: String, required: true },
    pDescription: { type: String, required: true },
    pPrice: { type: Number, required: true },
    pSold: { type: Number, default: 0 },
    pQuantity: { type: Number, default: 0 },
    pCategory: {
      type: ObjectId,
      ref: "categories",
      required: true,
    },
    pImages: {
      type: [String],
      required: true,
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length === 2;
        },
        message: "Exactly 2 images must be provided.",
      },
    },
    
    pOffer: { type: String, default: null },
    pRatingsReviews: [
      {
        review: String,
        user: { type: ObjectId, ref: "users" },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    pStatus: {
      type: String,
      enum: ["active", "inactive", "archived"],
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
