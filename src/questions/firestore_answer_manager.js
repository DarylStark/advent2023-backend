import AnswerManager from "./answer_manager.js";
import { Firestore } from '@google-cloud/firestore';

class FirestoreAnswerManager extends AnswerManager {
    constructor() {
        super();
        this.firestore_object = null;
    }

    create_firestore_object() {
        // TODO: Make the Firestore constructor args configurable
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
        // TODO: Make the collection name configurable
        this.create_firestore_object();
        const data = await this.firestore_object.collection('backend-dev');
        return data;
    }

    async get_given_answers_for_day(day) {
        const collection = await this.get_firestore_collection();
        const document = collection.doc(`answers_${day}`);
        const document_data = await document.get();
        let current_data = document_data.data();
        if (current_data == undefined) {
            current_data = {
                answers: new Array()
            }
        }
        return current_data.answers;
    }

    async save_answer_for_day(day, answer) {
        const collection = await this.get_firestore_collection();
        const document = collection.doc(`answers_${day}`);
        const answers = await this.get_given_answers_for_day(day);
        answers.push(answer);
        await document.set({
            answers: answers
        });
    }
};

export default FirestoreAnswerManager;