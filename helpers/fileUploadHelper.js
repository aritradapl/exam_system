const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = './public/uploads';
        fs.mkdirSync(uploadPath, { recursive: true });
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const uniqueId = uuidv4();
        const extension = path.extname(file.originalname);
        const uniqueFilename = `${uniqueId}${extension}`;
        callback(null, uniqueFilename);
    }
});

const maxSize = 3 * 1000 * 1000; // 3MB

const handleFileUpload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        if (['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('only jpg, jpeg, png are allowed'));
        }
    },
    limits: { fileSize: maxSize }
}).single('image');

module.exports = handleFileUpload;
