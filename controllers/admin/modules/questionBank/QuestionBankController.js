const QuestionBank = require('../../../../models/questionBank');
const { Validator } = require('node-input-validator');

const addQuestion = async (req,res) => {
    const { exam_id,question } = req.body; 
    const validate = new Validator(req.body, {
        exam_id: 'required',
        question: 'required'
    },
    {
        'exam_id.required': 'Exam Name is required',
        'question.required': 'Question is required',
    });    
    const matched = await validate.check();
    if (!matched) {
        return res.status(400).json({ msg: validate.errors });
    }
    const questionExists = await QuestionBank.findOne({ where: { question: question } });
    if (questionExists) {
        return res.status(400).json({ msg: 'Question already exists' });
    }
    try {
        const questionBank = await QuestionBank.create({
            exam_id,
            question
        });
        return res.status(200).json({ msg: 'Question added successfully'});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

module.exports = { addQuestion }