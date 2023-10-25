// Get globals
import { question_retriever, answer_manager } from './../globals.js'
import Response from '../response.js'
import express from 'express';
import date_functions from '../date_functions.js';

const router = express.Router();

function get_requested_day(requested_day) {
    const current_day = date_functions.get_current_day()
    let day = current_day;
    if (!isNaN(requested_day) && requested_day && requested_day < current_day) {
        day = requested_day;
    };
    return Number(day);
}

function get_question_for_day(day) {
    const day_number = get_requested_day(day);
    return question_retriever.get_question(day_number);
}

router.get('/get', (req, res) => {
    const question = get_question_for_day(req.query.day);
    res.setHeader('Content-Type', 'text/json');
    res.send(
        new Response({
            question: question.question
        })
    );
});

router.post('/save', async (req, res) => {
    const question = get_question_for_day(req.query.day);
    const day_number = get_requested_day(req.query.day);
    const given_answer = req.body.answer;
    let status_code = 500;
    let response_object = new Response({
        status: 'undefined'
    });

    await answer_manager.save_answer_for_day(day_number, given_answer);

    if (question.is_correct_answer(given_answer)) {
        status_code = 200;
        response_object.data.status = 'correct';
    } else {
        status_code = 406;
        response_object.data.status = 'wrong_answer';
        response_object.error.error = 'wrong_answer';
    }

    res.statusCode = status_code;
    res.send(response_object);
});

export default router;
