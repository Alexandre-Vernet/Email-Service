const express = require('express');
const superstoreRouter = express.Router();
const nodemailer = require("nodemailer");
const confirmOrder = require("../html_templates/superstore/confirm-order");
const sendNewsletter = require("../html_templates/superstore/send-newsletter");

superstoreRouter.post('/', (req, res) => {
        const {order, user} = req.body;

        const {USER, PASSWORD, NODE_ENV} = process.env;

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


        const mailOptions = {
            from: 'superstore@gmail.com',
            to: user.email,
            subject: 'Order Confirmation',
            html: confirmOrder(order, user),
        };


        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.send({
                    message: `Email not sent: ${ error }`
                });
            } else {
                res.send({
                    message: 'Email sent successfully'
                });
            }
        });
    }
);

superstoreRouter.post('/newsletter', (req, res) => {
        const {title, description, emails} = req.body.newsletter;


        const {USER, PASSWORD, NODE_ENV} = process.env;

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

        const mailOptions = {
            from: 'superstore@gmail.com',
            to: emails,
            subject: title,
            html: sendNewsletter(title, description),
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                res.send({
                    message: `Email not sent: ${ error }`
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
