const QuestionTypes = require('../../../../models/questionTypes');
const slug = require('slug'); // npm install slug
const { Validator } = require('node-input-validator');

const addQuestionTypes = async (req, res) => {
    let { name } = req.body;

    try {
        const validate = new Validator(req.body, {
            name: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }

        // check if question type exists
        let questionTypeExists = await QuestionTypes.findOne({ where: { name: name } });
        if (questionTypeExists) {
            return res.status(400).json({ msg: 'Question type already exists' });
        }
        // create slug from name
        
        let question_slug = slug(name);// default separator is '-'
        // console.log(question_slug);
        let questionTypes = new QuestionTypes();
        questionTypes.name = name;
        questionTypes.slug = question_slug;
        await questionTypes.save();

        return res.status(200).json({ msg: 'Question type added successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
const getQuestionTypes = async (req, res) => {
    try {
        let questionTypes = await QuestionTypes.findAll();
        return res.status(200).json({ questionTypes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
const editQuestionTypes = async (req, res) => {
    let { name } = req.body;
    let { id } = req.params;
    try {
        const validate = new Validator(req.body, {
            name: 'required'
        });
        const matched = await validate.check();
        if (!matched) {
            return res.status(400).json({ msg: validate.errors });
        }
        // Find the question type by ID
        let questionTypes = await QuestionTypes.findOne({ where: { id: id } });
        if (!questionTypes) {
            return res.status(404).json({ msg: 'Question type not found' });
        }
        
        // Check if the new name already exists for a different question type
        const questionTypeWithSameName = await QuestionTypes.findOne({ where: { name: name } });
        if (questionTypeWithSameName && questionTypeWithSameName.id != id) {
            return res.status(400).json({ msg: 'Question type with this name already exists' });
        }
        
        questionTypes.name = name;
        await questionTypes.save();
        return res.status(200).json({ msg: 'Question type updated successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
const deleteQuestionTypes = async (req, res) => {
    let { id } = req.params;
    try {
        let questionTypes = await QuestionTypes.findOne({ where: { id: id } });
        if (!questionTypes) {
            return res.status(404).json({ msg: 'Question type not found' });
        }
        await questionTypes.destroy();
        return res.status(200).json({ msg: 'Question type deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}
module.exports = { 
    addQuestionTypes,
    getQuestionTypes,
    editQuestionTypes,
    deleteQuestionTypes
}