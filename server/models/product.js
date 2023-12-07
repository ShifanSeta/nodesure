import mongoose from 'mongoose'


const ProductSchema = new mongoose.Schema({
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})


export default mongoose.model("product", ProductSchema)