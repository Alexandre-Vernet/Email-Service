const express = require('express');
const app = express();
const port = process.env.PORT || 3333;
const nodemailer = require("nodemailer");
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({
    origin: frontendUrl
}));

app.post('/', (req, res) => {
        const {name, email, message} = req.body;
        const {EMAIL_DESTINATION, USER, PASSWORD, NODE_ENV} = process.env;

        const mailOptions = {
            from: email,
            to: EMAIL_DESTINATION,
            subject: 'New message from your portfolio',
            text: `${ message } \n\n From: ${ name } \n Email: ${ email }`
        };

        let transporter;
        if (NODE_ENV === 'production') {
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: USER,
                    pass: PASSWORD
                }
            });
        } else {
            transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: USER,
                    pass: PASSWORD
                }
            });
        }

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error(error);
                res.send({
                    message: `Email not sent: ${ error }`
                });
            } else {
                res.send({
                    message: 'Email sent: '
                });
            }
        });
    }
);


app.listen(port, () => {
    console.log(`Server is running on port ${ port }`);
});
