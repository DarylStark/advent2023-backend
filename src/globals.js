import LocalRetriever from './questions/local_retriever.js';
import FirestoreAnswerManager from './questions/firestore_answer_manager.js';

export const question_retriever = new LocalRetriever();
export const answer_manager = new FirestoreAnswerManager();
