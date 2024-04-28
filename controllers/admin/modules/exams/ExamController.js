const Exam = require('../../../../models/exam');
const { Validator } = require('node-input-validator');
const { Op } = require("sequelize");

const addExam = async (req, res) => {
    const { exam_name  } = req.body;

    const validate = new Validator(req.body, {
        exam_name: 'required',
    });
    const matched = await validate.check();
    if (!matched) {
        return res.status(400).json({ msg: validate.errors });
    }
    try {
        let examExists = await Exam.findOne({ where: { exam_name: exam_name } });
        if (examExists) {
            return res.status(400).json({ msg: 'Exam already exists' });
        }
        let examData = await Exam.create({ exam_name: exam_name });
        res.status(200).json({ msg: 'Exam added successfully', examData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

const getExams = async (req, res) => {
    try {
        let exams = await Exam.findAll();
        res.status(200).json({ exams });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

const updateExams = async(req,res) => {
    const { exam_name  } = req.body;
    const id = req.params.id;

    const validate = new Validator(req.body, {
        exam_name: 'required',  
    });
    const matched = await validate.check();
    if (!matched) {
        return res.status(400).json({ msg: validate.errors });
    }

    let examExists = await Exam.findOne({ where: { exam_name: exam_name , id: { [Op.ne]: id } } });
    if (examExists) {
        return res.status(400).json({ msg: 'Exam already exists' });
    }
    try{
        const updateExam = await Exam.update({ exam_name: exam_name }, { where: { id: id } });
        if(updateExam){
            res.status(200).json({ msg: 'Exam updated successfully'});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = { 
    addExam,
    getExams,
    updateExams
}