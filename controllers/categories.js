const { request, response } = require("express")
const { Category } = require('../models')

// User - public
const getCategories = async ( req = request, res = response ) => {
    res.send('GET Categories')
}

// User - public
const getCategoryById = async ( req = request, res = response ) => {
    res.send("GET Category By ID")
}

// User - valid token
const createCategory = async ( req = request, res = response ) => {
    
    // Transform to UpperCase 'cause to validate categories name not equal or same
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {
        res.status(400).json({
            msg: `Category ${categoryDB.name} already exists`
        })
    } 

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    await category.save();

    return res.status(200).json(category)

}

// User - valid token
const updateCategory = async ( req = request, res = response ) => {
    res.send('Update Category')
}

// User - Admin Role
const deleteCategory = async ( req = request, res = response ) => {
    res.send('Delete Category')
}


module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
}