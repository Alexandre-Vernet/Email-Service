const express = require('express');
const router = express.Router();
const portfolioRouter = require('./portfolio');
const cors = require('cors');

router.use(cors({
    origin: '*'
}));

router.use('/portfolio', portfolioRouter);

module.exports = router;
