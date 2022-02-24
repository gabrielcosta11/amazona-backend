import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        userName: {type: String, required: true},
        userId: {type: String, required: true},
        comment: {type: String},
        rating: {type: Number, required: true}
    },

    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        image: {type: String, required: true},
        brand: {type: String, required: true},
        category: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        rating: {type: Number},
        numReviews: {type: Number},
        reviews: [reviewSchema],
    },

    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;