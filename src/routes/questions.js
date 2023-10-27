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

router.get('/get', async (req, res) => {
    const day_number = get_requested_day(req.query.day);
    const question = get_question_for_day(req.query.day);
    const last_answers = await answer_manager.get_given_answers_for_day(day_number);
    let correct = false;

    if (last_answers.findIndex(item => item.toLowerCase() == question.answer.toLowerCase()) != -1)
        correct = true;

    // Convert the `last_answers` list to a list with a field indicating if
    // this was the correct answer
    const last_answers_with_correctness = new Array();
    last_answers.forEach((last_answer) => {
        last_answers_with_correctness.push(
            {
                answer: last_answer,
                correct: question.is_correct_answer(last_answer)
            });
    });

    res.send(
        new Response({
            question: question.question,
            last_answers: last_answers_with_correctness,
            correct: correct
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
