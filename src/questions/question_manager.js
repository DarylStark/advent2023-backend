import { Firestore } from '@google-cloud/firestore';

const initial_questions = [
    // Jaartallen
    { question: 'In welk jaar werd de eerste kerstkaart vezonden?', answer: '1843' },
    { question: 'In wlke jaar werd Sinterklaas uitgeroepen tot nationale feestdag in Nederland?', answer: '1954' },
    { question: 'Uit welke Roman van George Orwell komt de beroemde zin: "Big Brother Is Watching You"?', answer: '1984' },
    { question: 'In welk jaar werd Daryl van Mieghem geboren?', answer: '1989' },

    // Drankjes
    { question: 'Welk drankje ontstond in 1940 in Duitsland omdat de juiste ingredienten voor Coca-Cola niet meer verkrijgbaar waren?', answer: 'Fanta' },
    { question: 'Welke drankje werd in 1929 geintroduceerd als "Bib-Label Lithiated Lemon-Lime Soda"?', answer: '7Up' },
    { question: 'Wat is een populair drankje uit Griekenland?', answer: 'Ouzo' },
    { question: 'Wat voor type drank is Kopi Luwak?', answer: 'Koffie' },

    // Nederlandse steden
    { question: 'Welke Nederlandse stad heeft in het spel Monopoly de kleur groen?', answer: 'Rotterdam' },
    { question: 'Welke Nederlandse stad wordt ook wel sleutestad genoemd?', answer: 'Leiden' },
    { question: 'Waar is in 1619 de koopman Jan van Riebeeck geboren?', answer: 'Culemborg' },
    { question: 'Waar wordt het Nederlandse filmfestival gehouden?', answer: 'Utrecht' },

    // Landen
    { question: 'Welk land gaf in 1886 het vrijheidsbeel cadeau aan de verenigde staten?', answer: 'Frankrijk' },
    { question: 'Uit welk land komt Fosters bier?', answer: 'Australie' },
    { question: 'Welk land heeft de hoogste gemiddelde leeftijd?', answer: 'Japan' },
    { question: 'Uit welk land komt Odd Sides Ales bier?', answer: 'Verenigde Staten' },

    // Datums
    { question: 'Op welke datum wordt Sinterklaas in Suriname gevrierd?', answer: '3 december' },
    { question: 'Op welke datum werd in 1964 het album "Beatles for Sale" gereleased?', answer: '4 december' },
    { question: 'Op welke datum in 2013 overleed Nelson Mandela?', answer: '5 december' },
    { question: 'Op welke datum wordt Pi Day gevierd?', answer: '14 maart' },

    // Bieren
    { question: 'Hoe heet het bier met het hoogste alcoholpercentage?', answer: 'Snake Venom' },
    { question: 'Van welk biermerk kennen we de slogan "Ons Bier"?', answer: 'Amstel' },
    { question: 'Van welke bierbrouwerij uit Talinn is het bier Meri Sichuan?', answer: 'Pohjala' },
    { question: 'Van welke bierbrouwerij is het bier Zombination V?', answer: 'De Struise Brouwers' },
    { question: 'Welke bierbrouwerij ligt in Pilsen?', answer: 'Plzensky Prazdroj' },
    { question: 'Van welk merk is het favoriete bier van Homer Simpson?', answer: 'Duff' },
    { question: 'Welke bierbrouwerij werd in 1873 opgericht?', answer: 'Heineken' },

    // Getallen
    { question: 'Hoeveel kleuren zitten er in een regenboog?', answer: '7' },
    { question: 'Uit hoeveel snaren bestaat een ukelele doorgaans?', answer: '4' },
    { question: 'Aan hoeveel landen grenst Mexico?', answer: '3' },
    { question: 'Hoeveel winkels heeft de Bijenkorf als je Amstelveen en Groningen niet meetelt?', answer: '6' }
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
        answer = answer.trim();
        const question = await this.get_question(day);
        question.given_answers.unshift(answer);
        question.correct =
            question.answer.toLowerCase().trim() ===
            answer.toLowerCase();
        const doc = await this.get_document(day);
        await doc.set(question);
        return question;
    }
}