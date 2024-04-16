const User  = require('../../../models/user'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Mail = require('../../../helpers/emailHelper');
// Validator
const { Validator } = require('node-input-validator');

const login = async (req, res) => {
    const { registration_number, password } = req.body;
    try {
        // validation section
        const validate = new Validator(req.body, {
            registration_number: 'required',
            password: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        // check if user exists
        let user = await User.findOne({ where: { registration_number: registration_number } });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }
        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        let minutes = 2; // in minutes
        let otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otp_expiry = Date.now() + minutes * 60 * 1000; 
        await user.save();
        res.status(200).json({ msg: `OTP sent successfully to ${user.email}` });
        // send email
        Mail.sendEmail(user.email, 'Login OTP', 'Login OTP' ,`Hii ${user.name},<br> Your Login OTP is ${otp}`);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
const otpCheck = async (req, res) => {
    const { otp } = req.body;
    try {
        // validation section
        const validate = new Validator(req.body, {
            otp: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        // check if user exists
        let user = await User.findOne({ where: { otp: otp } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }
        else
        {
            // check if otp is expired
            let currentTime = Date.now();
            if (currentTime > user.otp_expiry) {
                return res.status(400).json({ msg: 'OTP expired' });
            }
            else{
                // update otp
                user.otp = null;
                user.otp_expiry = null;
                await user.save();
                // generate token after login
                const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                res.setHeader('Authorization', `Bearer ${token}`);
                res.status(200).json({ msg: 'Login Successfull', 'token':token });
                // send email
                Mail.sendEmail(user.email, 'Login Successfull', 'Login Successfull' ,`Hii ${user.name} Successfully Logged In`);
            }
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = {
    login,
    otpCheck
}