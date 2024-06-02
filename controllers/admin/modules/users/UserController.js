const User = require('../../../../models/user');
const bcrypt = require('bcrypt');
const Mail = require('../../../../helpers/emailHelper');
const handleFileUpload = require('../../../../helpers/fileUploadHelper');
const multer = require('multer');
const { Validator } = require('node-input-validator');
const { Op } = require("sequelize");

const addUser = async (req, res) => {
    handleFileUpload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'Please select an image' });
        }

        const { name, email, phone, registration_number, password } = req.body;
        const image = req.file.filename;

        try {
            const validate = new Validator(req.body, {
                name: 'required',
                email: 'required|email',
                phone: 'required|integer|maxLength:10|minLength:10',
                registration_number: 'required',
                password: 'required'
            });
            const matched = await validate.check();
            if (!matched) {
                return res.status(400).json({ msg: validate.errors });
            }

            let emailExists = await User.findOne({ where: { email: email } });
            if (emailExists) {
                return res.status(400).json({ msg: 'Email already exists' });
            }

            let phoneExists = await User.findOne({ where: { phone: phone } });
            if (phoneExists) {
                return res.status(400).json({ msg: 'Phone number already exists' });
            }

            let userIdExists = await User.findOne({ where: { registration_number: registration_number } });
            if (userIdExists) {
                return res.status(400).json({ msg: 'Registration number already exists' });
            }

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

            const adminEmail = process.env.ADMIN_EMAIL;
            Mail.sendEmail(adminEmail, 'Registration', 'Registration', `Hi admin,<br> user ${name} registered successfully`);
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    });
};

const getUsers = async (req, res) => {
    try {
        let users = await User.findAll({ where: { role: 'user' } });
        res.status(200).json({ users });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};

const updateUser = async (req, res) => {
    const { name, email, phone, registration_number, password } = req.body;
    const id = req.params.id;

    handleFileUpload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error: ' + err.message });
        } else if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'Please select an image' });
        }

        const image = req.file.filename;

        try {
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

            let emailExists = await User.findOne({ where: { email: email, id: { [Op.ne]: id } } });
            if (emailExists) {
                return res.status(400).json({ msg: 'Email already exists' });
            }

            let phoneExists = await User.findOne({ where: { phone: phone, id: { [Op.ne]: id } } });
            if (phoneExists) {
                return res.status(400).json({ msg: 'Phone number already exists' });
            }

            let userIdExists = await User.findOne({ where: { registration_number: registration_number, id: { [Op.ne]: id } } });
            if (userIdExists) {
                return res.status(400).json({ msg: 'Registration number already exists' });
            }

            let user = await User.findOne({ where: { id: id } });
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.registration_number = registration_number;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
            }
            user.image = image;
            await user.save();
            res.status(200).json({ msg: 'User updated successfully' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send(err.message);
        }
    });
};

module.exports = {
    addUser,
    getUsers,
    updateUser
};