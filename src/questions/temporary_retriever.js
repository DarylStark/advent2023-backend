import QuestionRetriever from './question_retriever.js';
import Question from './question.js';

const questions = {
    1: new Question('Wat is de hoofdstad van Nederland', 'Amsterdam')
}

class TemporaryRetriever extends QuestionRetriever {
    constructor() {
        super();
        console.log('TemporaryRetriever created');
    }

    get_question(day) {
        if (day in questions)
            return questions[day];
        throw Error(`Unknown day: ${day}`);
    }
};

export default TemporaryRetriever;