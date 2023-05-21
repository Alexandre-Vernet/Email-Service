const express = require('express');
const superstoreRouter = express.Router();
const nodemailer = require("nodemailer");
const confirmOrder = require("../html_templates/superstore/confirm-order");

superstoreRouter.post('/', (req, res) => {
        const { order, user } = req.body;
        const { USER, PASSWORD, NODE_ENV } = process.env;

        const mailOptions = {
            from: 'superstore@gmail.com',
            to: user.email,
            subject: 'Order Confirmation',
            html: confirmOrder(order, user),
        };

        const transporterOptions = {
            auth: {
                user: USER,
                pass: PASSWORD
            }
        };

        if (NODE_ENV === 'production') {
            transporterOptions.service = 'gmail';
        } else {
            transporterOptions.host = "sandbox.smtp.mailtrap.io";
            transporterOptions.port = 2525;
        }

        const transporter = nodemailer.createTransport(transporterOptions);

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.send({
                    message: `Email not sent: ${error}`
                });
            } else {
                res.send({
                    message: 'Email sent successfully'
                });
            }
        });
    }
);

module.exports = superstoreRouter;
