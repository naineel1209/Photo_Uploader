const express = require('express');
const router = express.Router();
const {
    getAllImages, downloadImage, postImage, uploadImage
} = require('..//controllers/imageController');

router.route('/photos')
    .get(getAllImages)
    .post(postImage);

router.route('/downloads')
    .get(downloadImage);

router.route('/uploads')
    .post(uploadImage);

module.exports = router;
