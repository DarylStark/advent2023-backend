import { Firestore } from '@google-cloud/firestore';
import Question from './question.js';

const initial_questions = [
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Belgie?', answer: 'Brussel' },
    { question: 'Wat is de hoofdstad van Duitsland?', answer: 'Berlijn' },
    { question: 'Wat is de hoofdstad van Frankrijk?', answer: 'Parijs' },
    { question: 'Wat is de hoofdstad van Spanje?', answer: 'Madrid' },
    { question: 'Wat is de hoofdstad van Portugal?', answer: 'Lissabon' },
    { question: 'Wat is de hoofdstad van Polen?', answer: 'Warsaw' },
    { question: 'Wat is de hoofdstad van Oekraine?', answer: 'Kiev' },
    { question: 'Wat is de hoofdstad van Engeland?', answer: 'Londen' },
    { question: 'Wat is de hoofdstad van Schotland?', answer: 'Edinburgh' },
    { question: 'Wat is de hoofdstad van Noord Ierland?', answer: 'Belfast' },
    { question: 'Wat is de hoofdstad van Ierland?', answer: 'Dublin' },
    { question: 'Wat is de hoofdstad van Italie?', answer: 'Rome' },
    { question: 'Wat is de hoofdstad van Griekenland?', answer: 'Athene' },
    { question: 'Wat is de hoofdstad van Turkije?', answer: 'Ankara' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wie is er op 26 oktober jarig?', answer: 'Daryl' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' },
    { question: 'Wat is de hoofdstad van Nederland?', answer: 'Amsterdam' }
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
        if (!question.exists) {
            await this.reset();
            return await this.get_question(day);
        }
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