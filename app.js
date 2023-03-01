require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
//middlewares
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

//database
const connectDB = require('./db');

//routes
const imageRoutes = require('./routes/imageRoutes');
const viewRoutes = require('./routes/viewRoutes');

//middlewares implementation
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, './public')));
app.use(fileUpload({
    useTempFiles: true,
}));
app.use(express.json());

//router implementation
app.use('/', viewRoutes)
app.use('/api/v1', imageRoutes);

//error handler and notfound handler
app.use(require('.//middlewares/error-handler'));
app.use(require('.//middlewares/not-found'));

//connecting to the database and listening to the server
const start = async () => {
    await connectDB(process.env.MONGO_URI);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT);
    })
}

start();

