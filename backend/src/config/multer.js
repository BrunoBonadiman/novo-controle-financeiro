const multer = require('multer');
const crypto = require("crypto");
const path = require('path');

module.exports = (multer({

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, file.key);
            })
        },

        limits: {
            fileSize: 2 * 1024 * 1024
        },

        fileFilter: (req, file, cb) => {
            const isAccepted = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].find(acceptedformat => acceptedformat == file.mimetype);
            if (isAccepted) {
                return cb(null, true);
            }
            return cb(null, false);
        }
    })
}));