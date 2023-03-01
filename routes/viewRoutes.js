const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/')
    .get((req, res) => {
        // res.send("Hello View Routes are set!");
        res.sendFile('index');
    })

router.route('/create')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/create.html'));
    })

module.exports = router;