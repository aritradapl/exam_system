const User  = require('../../../../models/user'); 
const bcrypt = require('bcrypt');
const Mail = require('../../../../helpers/emailHelper');
// Validator
const { Validator } = require('node-input-validator');
const { Op } = require("sequelize");

const addUser = async (req, res) => {
    const { name, email,phone,registration_number,password } = req.body;
    const image = req.file.filename;
    // console.log(image);
    try {
        // validation section
        const validate = new Validator(req.body, {
            name: 'required',
            email: 'required|email',
            phone: 'required',
            registration_number: 'required',
            password: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        if(!req.file){
            return res.status(400).json({ msg: 'Please select an image' });
        }
        // check if email exists
        let emailExists = await User.findOne({ where: { email: email } });
        if (emailExists) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        // check if phone number exists
        let phoneExists = await User.findOne({ where: { phone: phone } });

        if (phoneExists) {
            return res.status(400).json({ msg: 'Phone number already exists' });
        }
        // check if registration number exists
        let userIdExists = await User.findOne({ where: { registration_number: registration_number } });
        if (userIdExists) {
            return res.status(400).json({ msg: 'Registration number already exists' });
        }
        // create user
        let user = new User();
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.registration_number = registration_number;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.image = image;
        await user.save();
        res.status(200).json({ msg: 'User registered successfully' });
        // send email
        adminEmail = process.env.ADMIN_EMAIL;
        Mail.sendEmail(adminEmail, 'Registration', 'Registration' ,`Hii admin,<br> user ${name} registered successfully`);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

const getUsers = async (req, res) => {
    try {
        let users = await User.findAll({ where: { role: 'user' } });
        res.status(200).json({ users });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
const updateUser = async (req, res) => {
    const { name, email,phone,registration_number,password } = req.body;
    const id = req.params.id;
    const image = req.file.filename;
    // console.log(image);
    try {
        // validation section
        const validate = new Validator(req.body, {
            name: 'required',
            email: 'required|email',
            phone: 'required',
            registration_number: 'required',
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        // check if email exists
        let emailExists = await User.findOne({ where: { email: email , id: { [Op.ne]: id }}  });
        if (emailExists) {
            return res.status(400).json({ msg: 'Email already exists' });
        }
        // check if phone number exists
        let phoneExists = await User.findOne({ where: { phone: phone , id: { [Op.ne]: id }} });

        if (phoneExists) {
            return res.status(400).json({ msg: 'Phone number already exists' });
        }
        // check if registration number exists
        let userIdExists = await User.findOne({ where: { registration_number: registration_number , id: { [Op.ne]: id } } });
        if (userIdExists) {
            return res.status(400).json({ msg: 'Registration number already exists' });
        }
        let user = await User.findOne({ where: { id: id } });
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.registration_number = registration_number;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        user.image = image;
        await user.save();
        res.status(200).json({ msg: 'User updated successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = { 
    addUser,
    getUsers,
    updateUser
}