const path = require('path');
const { v4: uuid } = require('uuid')

const uploadFiles = async ( files, extAllowed = ["jpg", "png", "gif", "jpeg"], folder = '' ) => {
    
    return new Promise( (resolve, reject ) => {

        const { file } = files;
        const splitName = file.name.split(".");
        const ext = splitName[splitName.length - 1];
      
        if (!extAllowed.includes(ext)) {
          return reject(`Invalid format - Formats Allowed: ${extAllowed}`)
        }
      
        const tempName = uuid() + "." + ext;
      
        const uploadPath = path.join(__dirname + "/../uploads/", folder ,tempName);
      
        file.mv(uploadPath, err => {
          if (err) {
            reject(err)
          }
      
          resolve( tempName )
        });

    })
};

const collectionAllowed = async ( collection = '' , collectionsAllowed = []) => {

  const include = collectionsAllowed.includes( collection );

  if (!include) {
    throw new Error(`Collection: ${ collection } not valid - ${collectionsAllowed} `)
  }

  return true;
}

module.exports = {
    uploadFiles,
    collectionAllowed
}