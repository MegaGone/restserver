const { request, response } = require('express');
const { Product } = require('../models');

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
    
    const { name, enabled, user, ...body } = req.body;

    const productDB = await Product.findOne({ name });
    
    if (productDB) {
        return res.status(400).json({
            msg: `ERROR: ${name} category already exist.`
        })
    }

    const data = {
        name,
        user: req.user._id,
        ...body
    }

    const product = new Product( data );

    await product.save();

    return res.status(201).json({ product })

}

const getProductById = async( req = request, res = response ) => {
    
    const { id } = req.params;

    const productDB = await Product.findById( id )
                        .populate('user', 'name')
                        .populate('category', 'name')

    return res.status(200).json({ productDB });

}

const updateProduct = async( req = request, res = response ) => {
    
    const { id } = req.params;
    
    const { enabled, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    try {

        const category = await Product.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({category})
        
    } catch (e) {
        return res.status(400).json({ msg: `ERROR: ${name} al ready exist` })
    }

}

const deleteProduct = async( req = request, res = response ) => {
    
    const { id } = req.params;

    const category = await Product.findByIdAndUpdate(id, { enabled: false }, { new: true });

    return res.status(200).json({ category })

}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
}