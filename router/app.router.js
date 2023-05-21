const express = require('express');
const router = express.Router();
const portfolioRouter = require('./portfolio');
const superstoreRouter = require('./superstore');
const cors = require('cors');

router.use(cors({
    origin: '*'
}));

router.use('/portfolio', portfolioRouter);
router.use('/superstore', superstoreRouter);

module.exports = router;
