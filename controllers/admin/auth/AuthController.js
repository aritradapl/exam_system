const User  = require('../../../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Mail = require('../../../helpers/emailHelper');
// Validator
const { Validator } = require('node-input-validator');

const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password);
    try {
        // validation section
        const validate = new Validator(req.body, {
            email: 'required',
            password: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        // check if user exists
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        // check if user role is admin
        if (user && user.role !== 'admin') {
            return res.status(400).json({ msg: 'You are not an admin' });
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json({ msg: 'Login Successfull', 'token':token });
        // send email
        Mail.sendEmail(user.email, 'Login Successfull', 'Login Successfull' ,`Hii ${user.name} Successfully Logged In`);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = {
    login
}