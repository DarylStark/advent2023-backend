// Get globals
import globals from './../globals.js'

import express from 'express';
const router = express.Router();

import date_functions from '../date_functions.js';

function get_requested_day(requested_day) {
    const current_day = date_functions.get_current_day()
    let day = current_day;
    if (!isNaN(requested_day) && requested_day && requested_day < current_day) {
        day = requested_day;
    };
    return day;
}

function get_question_for_day(day) {
    const day_number = get_requested_day(day);
    return globals.question_retriever.get_question(day_number);
}

router.get('/get', (req, res) => {
    const question = get_question_for_day(req.query.day);
    res.setHeader('Content-Type', 'text/json');
    res.send(
        {
            question: question.question
        }
    );
});

router.post('/save', (req, res) => {
    const question = get_question_for_day(req.query.day);
    const given_answer = req.body.answer;
    let status_code = 403;
    let response_object = {
        status: 'wrong'
    };

    if (question.answer == given_answer) {
        status_code = 200;
        response_object.status = 'correct';
    }

    res.statusCode = status_code;
    res.send(response_object);
});

export default router;