import express from 'express';
const router = express.Router();

import Response from '../response.js'

router.get('*', (req, res) => {
    const response = new Response();
    response.error.error = 'Unknown API endpoint';
    res.send(response);
});

export default router;