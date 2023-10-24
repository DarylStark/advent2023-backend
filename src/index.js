// Set up Express
const express = require('express')
const app = express();

// Load routes from the route modules
const questions = require('./routes/questions')

// Mount routes
app.use('/questions', questions);

// Start the server
app.listen(3000, () => {
    console.info('Server started');
})