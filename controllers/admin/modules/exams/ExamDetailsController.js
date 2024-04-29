const ExamDetails =  require('../../../../models/examDetails')
const { Validator } = require('node-input-validator')

const addExamDetails = async (req,res) => {
    const { exam_id,year_id,institution_id,total_marks,passing_marks,duration } = req.body;

    const validator = new Validator(req.body,{
        'exam_id':'required',
        'year_id':'required',
        'institution_id':'required',
        'total_marks':'required|number',
        'passing_marks':'required|number',
        'duration':'required|number'
    })

    const matched = await validator.check();
    if(!matched){
        return res.status(400).json({msg:validator.errors})
    }

    try{
        let examDetails = await ExamDetails.create({exam_id,year_id,institution_id,total_marks,passing_marks,duration})
        res.status(200).json({msg:'Exam Details added successfully',examDetails})
    }catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
    }
}

module.exports = {addExamDetails}
