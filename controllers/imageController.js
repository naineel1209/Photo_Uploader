const axios = require('axios');
//mongoose model
const Image = require('../models/Image');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes');

const downloadImage = async function (req, res) {
    // const url = "https://res.cloudinary.com/dhjo1bmn7/image/upload/v1677524175/FILE_UPLOADER/tmp-1-1677524173453_d3dmzh.jpg";
    // const url = "https://plus.unsplash.com/premium_photo-1661717145943-8485a17dec16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

    const url = req.query.downloadLink;
    console.log(url);
    let filename = url.split('/').pop();

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    }).then(response => {
        response.data.pipe(res);
    }).catch(error => {
        console.log(error);
    });
};

const getAllImages = async (req, res) => {
    const images = await Image.find({});

    return res.status(StatusCodes.OK).send({
        images,
        countN: images.length,
    });
};

const postImage = async function (req, res) {
    console.log(req.body);
    try {
        const imageRes = await Image.create(req.body);
        return res.status(StatusCodes.CREATED).send({ status: 'ok', imageRes });
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ status: 'error', msg: e.message });
    }
};

//upload image to the cloud
const uploadImage = async function (req, res) {
    console.log(req.files);
    try {
        const result = await cloudinary.uploader.upload(req.files.image["tempFilePath"], {
            use_filename: true,
            folder: 'FILE_UPLOADER'
        });

        console.log(result);
        return res.status(StatusCodes.OK).json({
            status: 'ok',
            src: result.secure_url,
        })
    } catch (e) {
        return res.status(StatusCodes.OK).json({
            status: 'error',
        })
    }
};

module.exports = {
    getAllImages, downloadImage, postImage, uploadImage
};