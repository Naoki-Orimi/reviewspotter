const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: "ReviewSpotter", message: "Map から 情報を収集します！" });
});

router.get('/top', (req, res) => {
    res.render('top', { title: "ReviewSpotter", message: "Review Spotter へようこそ！" });
});

module.exports = router;
