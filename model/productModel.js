import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
        unique: false
    },
    name: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: false,
    },
    photo: {
        type: String,
        required:true
    }

});

const Product = mongoose.model('Product', productSchema);

export default Product;
