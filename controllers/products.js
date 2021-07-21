const { request, response } = require('express');
const { Product } = require('../models')

const getProducts = async( req = request, res = response ) => {
    
    const query = { enabled: true };
    const { limit = 5, from = 0 } = req.query;

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    return res.status(200).json({
        total,
        products
    })

}

const createProduct = async( req = request, res = response ) => {
    res.send("POST")
}

const getProductById = async( req = request, res = response ) => {
    res.send("GET ID")
}

const updateProduct = async( req = request, res = response ) => {
    res.send("UPDATE")
}

const deleteProduct = async( req = request, res = response ) => {
    res.send("DELETE")
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}