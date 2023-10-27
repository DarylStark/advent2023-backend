import QuestionRetriever from './question_retriever.js';
import Question from './question.js';

const questions = {
    1: new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    2: new Question('Wat is de hoofdstad van Belgie?', 'Amsterdam'),
    3: new Question('Wat is de hoofdstad van Duitsland?', 'Amsterdam'),
    4: new Question('Wat is de hoofdstad van Frankrijk?', 'Amsterdam'),
    5: new Question('Wat is de hoofdstad van Spanje?', 'Amsterdam'),
    6: new Question('Wat is de hoofdstad van Portugal?', 'Amsterdam'),
    7: new Question('Wat is de hoofdstad van Polen?', 'Amsterdam'),
    8: new Question('Wat is de hoofdstad van Oekraine?', 'Amsterdam'),
    9: new Question('Wat is de hoofdstad van Engeland?', 'Amsterdam'),
    10: new Question('Wat is de hoofdstad van Schotland?', 'Amsterdam'),
    11: new Question('Wat is de hoofdstad van Noord Ierland?', 'Amsterdam'),
    12: new Question('Wat is de hoofdstad van Ierland?', 'Amsterdam'),
    13: new Question('Wat is de hoofdstad van Italie?', 'Amsterdam'),
    14: new Question('Wat is de hoofdstad van Griekenland?', 'Amsterdam'),
    15: new Question('Wat is de hoofdstad van Turkije?', 'Amsterdam'),
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
    26: new Question('Wie is er vandaag jarig?', 'Amsterdam'),
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