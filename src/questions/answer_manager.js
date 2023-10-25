class AnswerManager {
    constructor() { }

    get_given_answers_for_day(day) {
        throw new Error('Not implemented in Base Class. Use a derived class instead.')
    }

    save_answer_for_day(day, answer) {
        throw new Error('Not implemented in Base Class. Use a derived class instead.')
    }
};

export default AnswerManager;