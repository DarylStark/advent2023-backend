// Get globals
import { question_manager } from './../globals.js'
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

router.get('/get', async (req, res) => {
    const day_number = get_requested_day(req.query.day);
    let question = await question_manager.get_question(day_number);
    if (!question.correct) delete question.answer;
    res.send(new Response(question));
});

router.post('/save', async (req, res) => {
    const given_answer = req.body.answer;
    let status_code = 200;
    let response_object = new Response({
        status: 'undefined'
    });

    const day_number = get_requested_day(req.query.day);
    const new_question = await question_manager.add_answer(day_number, given_answer);
    response_object.data = new_question;

    if (!new_question.correct) {
        status_code = 406;
        delete response_object.data.answer;
    }

    res.statusCode = status_code;
    res.send(response_object);
});

router.get('/reset', async (req, res) => {
    await question_manager.reset();
    res.send(new Response({ done: true }));
});

router.get('/overview', async (req, res) => {
    let output = {};
    for (let day_number = 1; day_number <= 31; day_number++) {
        let question = await question_manager.get_question(day_number);
        output[day_number] = question.correct;
    }
    res.send(new Response(output));
});

export default router;
