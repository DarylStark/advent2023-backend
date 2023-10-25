import QuestionRetriever from './question_retriever.js';
import Question from './question.js';

const questions = {
    1: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    2: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    3: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    4: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    5: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    6: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    7: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    8: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    9: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    10: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    11: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    12: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    13: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    14: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    15: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    16: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    17: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    18: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    19: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    20: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    21: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    22: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    23: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    24: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    25: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    26: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    27: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    28: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    29: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    30: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    31: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam')
}

class LocalRetriever extends QuestionRetriever {
    constructor() {
        super();
    }

    get_question(day) {
        if (day in questions)
            return questions[day];
        throw Error(`Unknown day: ${day}`);
    }
};

export default LocalRetriever;