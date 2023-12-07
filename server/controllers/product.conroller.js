import Product from '../models/product.js'

export const getProduct = async(req, res, next) => {
    const failed = true

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllProduct = async(req, res, next) => {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
}