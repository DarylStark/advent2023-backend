class QuestionRetriever {
    constructor() {
        console.log('QuestionRetriever created');
    }

    get_question(day) {
        throw new Error('Not implemented in Base Class. Use a derived class instead.')
    }
};

export default QuestionRetriever;