import mongoose from "mongoose";

/* 
Los modelos determinan como seran almacenados los datos en la DB
*/

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product