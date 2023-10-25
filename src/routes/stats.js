import express from 'express';
const router = express.Router();

router.get('/get', (req, res) => {
    // TODO: reply with all the stats for the days
    console.log('getting');
});

export default router;