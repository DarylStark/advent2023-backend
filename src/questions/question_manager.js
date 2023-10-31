import { Firestore } from '@google-cloud/firestore';
import Question from './question.js';

const initial_questions = [
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Belgie?', 'Brussel'),
    new Question('Wat is de hoofdstad van Duitsland?', 'Berlijn'),
    new Question('Wat is de hoofdstad van Frankrijk?', 'Parijs'),
    new Question('Wat is de hoofdstad van Spanje?', 'Madrid'),
    new Question('Wat is de hoofdstad van Portugal?', 'Lissabon'),
    new Question('Wat is de hoofdstad van Polen?', 'Warsaw'),
    new Question('Wat is de hoofdstad van Oekraine?', 'Kiev'),
    new Question('Wat is de hoofdstad van Engeland?', 'Londen'),
    new Question('Wat is de hoofdstad van Schotland?', 'Edinburgh'),
    new Question('Wat is de hoofdstad van Noord Ierland?', 'Belfast'),
    new Question('Wat is de hoofdstad van Ierland?', 'Dublin'),
    new Question('Wat is de hoofdstad van Italie?', 'Rome'),
    new Question('Wat is de hoofdstad van Griekenland?', 'Athene'),
    new Question('Wat is de hoofdstad van Turkije?', 'Ankara'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wie is er vandaag jarig?', 'Daryl'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam'),
    new Question('Wat is de hoofdstad van Nederland?', 'Amsterdam')
]

export default class QuestionManager {
    constructor() {
        this.firestore_object = null;
    }

    create_firestore_object() {
        if (this.firestore_object === null) {
            const firestore_configuration = {
                projectId: process.env.FIRESTORE_PROJECT_ID
            };
            if (process.env.FIRESTORE_KEY_FILENAME)
                firestore_configuration['keyFilename'] = process.env.FIRESTORE_KEY_FILENAME
            this.firestore_object = new Firestore(firestore_configuration);
        }
    }

    async get_firestore_collection() {
        this.create_firestore_object();
        const data = await this.firestore_object.collection(process.env.FIRESTORE_COLLECTION_NAME);
        return data;
    }

    async get_document(day) {
        const collection = await this.get_firestore_collection();
        if (day < 10) {
            day = `0${day}`
        }
        return collection.doc(`question_${day}`);
    }

    async reset() {
        for (let day = 1; day <= 31; day++) {
            const doc = await this.get_document(day);
            await doc.set({
                day: day,
                question: initial_questions[day - 1].question,
                answer: initial_questions[day - 1].answer,
                given_answers: [],
                correct: false
            });
        }
    }

    async get_question(day) {
        const doc = await this.get_document(day);
        const question = await doc.get();
        return question.data();
    }

    async add_answer(day, answer) {
        const question = await this.get_question(day);
        question.given_answers.push(answer);
        question.correct = question.answer.toLowerCase() === answer.toLowerCase();
        const doc = await this.get_document(day);
        await doc.set(question);
        return question;
    }
}