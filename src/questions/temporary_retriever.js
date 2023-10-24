import QuestionRetriever from './question_retriever.js';

const questions = {
    1: { question: 'Wat is de hoofdstad van Nederland', answer: 'Amsterdam' }
}

class TemporaryRetriever extends QuestionRetriever {
    constructor() {
        super();
        console.log('TemporaryRetriever created');
    }

    get_question(day) {
        if (day in questions)
            return questions[day];
        throw Error(`Unknon day: ${day}`);
    }
};

export default TemporaryRetriever;