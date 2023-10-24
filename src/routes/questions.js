const express = require('express');
const router = express.Router();

const date_functions = require('../date_functions');

router.get('/get', (req, res) => {
    const current_day = date_functions.get_current_day()
    let day = current_day;
    const requested_day = req.query.day;

    if (requested_day && requested_day < current_day) day = req.query.day;

    res.send(`Question for day: ${day}`);
});

module.exports = router;