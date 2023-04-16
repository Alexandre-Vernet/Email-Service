const checkFormat = (req, res, next) => {
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
        res.status(400).send({
            message: 'Please fill all fields'
        });
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        res.status(400).send({
            message: 'Please enter a valid email'
        });
    }

    next();

};

module.exports = {checkFormat};
