const multer = require('multer'),
path = require('path');

var multerFilesFilter = (pathToSave, filesNumber, fileSize) => {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.resolve(pathToSave))
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname)
        }
      })
       
    var upload = multer({
        storage: storage,
        limits: {
            files: filesNumber,
            fileSize: fileSize * 1024 * 1024
        },
        fileFilter: function(req, file, cb) {
            if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
                return cb(new Error('Somente imagens podem ser usadas'));
            } 
            return cb(null, true);
        }
    }).single('imagesGroup');

    return upload;
}

module.exports = multerFilesFilter;