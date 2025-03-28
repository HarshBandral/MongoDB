const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// diskStorage
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12,function(err,name){// to get unique fn so that file will not be overridden
        const fn = name.toString('hex') +path.extname(file.originalname);// add extname (.jpeg etc) and make above name into hexadecimal as it was in buffer form earlier 
        cb(null, fn);
      })
    }
  })

  // export upload variable
  
  const upload = multer({ storage: storage })
  module.exports = upload;