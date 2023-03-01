require('dotenv').config();
const mongoose = require('mongoose');

const Image = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a valid name"]
    },
    description: {
        type: String,
        required: [true, "Please provide a valid description"]
    },
    image: {
        type: String,
        required: [true, "Please provide a valid image"]
    },
    publishedBy: {
        type: String,
        required: [true, "Please provide a valid publisher"]
    }
}, {
    timestamps: true,
});

// const keywords = ["keyword1", "keyword2", "keyword3"]; // keywords to search for

// MyModel.find({ tags: { $in: keywords } }, function (err, docs) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs); // documents that contain at least one of the specified keywords in the "tags" field
//     }
// });

// const MySchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     tags: [String],
// });

// MySchema.index({ title: 'text', description: 'text' });

// MyModel.find({ $text: { $search: "keyword" } }, function (err, docs) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// });



module.exports = mongoose.model('Image', Image);