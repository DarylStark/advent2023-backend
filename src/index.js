// Set up Express
import express from 'express';
import bodyparser from 'express';
const app = express();

// Load routes from the route modules
import questions from './routes/questions.js';
import stats from './routes/stats.js';

// Configure modules
app.use(bodyparser.json());

// Mount routes
app.use('/questions', questions);
app.use('/stats', stats);

// Start the server
app.listen(3000, () => {
    console.info('Server started');
})