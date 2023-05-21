const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const router = require('./router/app.router');
require('dotenv').config();

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
