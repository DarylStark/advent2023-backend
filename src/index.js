// Set up Express
import express from 'express';
import bodyparser from 'express';
import cors from 'cors';

const app = express();

// Load routes from the route modules
import error_page_404 from './routes/404.js';
import questions from './routes/questions.js';
import stats from './routes/stats.js';

// Load error page
import error_page from './routes/error_page.js';

// Configure modules
app.use(bodyparser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

// Mount routes
app.use('/questions', questions);
app.use('/stats', stats);
app.use('*', error_page_404);

// Custom error pages
app.use(error_page);

// Start the server
app.listen(process.env.PORT, () => {
    console.info(`Server started on port ${process.env.PORT}`);
})