import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;