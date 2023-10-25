class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }

    is_correct_answer(given_answer) {
        return this.answer.toLowerCase().trim() == given_answer.toLowerCase().trim();
    }
};

export default Question;