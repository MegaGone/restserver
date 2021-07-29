const { request, response } = require("express");
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL )

const { uploadFiles } = require("../helpers");
const { User, Product } = require('../models');

const uploadFile = async (req = request, res = response) => {

  try {

    // const completePath = await uploadFiles(req.files, ['txt', 'md'], 'texts');
    const completePath = await uploadFiles(req.files, undefined, 'imgs');

    res.json({ path: completePath });

  } catch (msg) {
    return res.status(400).send(msg);
  }

};

const updateImage = async ( req = request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':

      model = await User.findById( id );
      if (!model) {
        return res.status(400).json({ msg: `ERROR: Dont exist an user with ID:${id}` })
      }

      break;

    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({ msg: `ERROR: Dont exist a prodcut with ID:${id}` });
      }

      break;
  
    default:
      return res.status(500).json({ msg: 'ERROR: We have a issue to upload image'})
      break;
  }

  if( model.img ) {
    const pathImg = path.join( __dirname, '../uploads', collection, model.img);

    if ( fs.existsSync( pathImg ) ) {
      fs.unlinkSync( pathImg )
    }

  }

  try {
    
    const name = await uploadFiles(req.files, undefined, collection );
    model.img = name;
  
    await model.save();
  
    return res.status(200).json({ model })

  } catch (msg) {
    return res.status(400).send(msg)
  }

}

const updateImageCloudinary = async ( req = request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':

      model = await User.findById( id );
      if (!model) {
        return res.status(400).json({ msg: `ERROR: Dont exist an user with ID:${id}` })
      }

      break;

    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({ msg: `ERROR: Dont exist a prodcut with ID:${id}` });
      }

      break;
  
    default:
      return res.status(500).json({ msg: 'ERROR: We have a issue to upload image'})
      break;
  }

  if( model.img ) {
    const nameArr = model.img.split('/');
    const name = nameArr[ nameArr.length -1 ];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy( public_id )
  }

  try {
    
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
  
    await model.save();
  
    return res.status(200).json({ model })

  } catch (msg) {
    return res.status(400).send(msg)
  }

}

const showImage = async ( req = request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':

      model = await User.findById( id );
      if (!model) {
        return res.status(400).json({ msg: `ERROR: Dont exist an user with ID:${id}` })
      }

      break;

    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({ msg: `ERROR: Dont exist a prodcut with ID:${id}` });
      }

      break;
  
    default:
      return res.status(500).json({ msg: 'ERROR: We have a issue to upload image'})
      break;
  }

  if( model.img ) {
    const pathImg = path.join( __dirname, '../uploads', collection, model.img);

    if ( fs.existsSync( pathImg ) ) {
      return res.sendFile( pathImg )
    }

  }

  // res.json({ msg: 'PLACEHOLDER'})
  const noImagePath = path.join( __dirname, '../assets/no-image.jpg');

  return res.sendFile( noImagePath )


}

module.exports = {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudinary
};
