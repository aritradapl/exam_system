const Institution = require('../../../../models/institution');
const { Validator } = require('node-input-validator');
const { Op } = require('sequelize');

const addInstitution = async (req, res) => {
    const { institution_name  } = req.body;

    const validate = new Validator(req.body, {
        institution_name: 'required',
    });
    const matched = await validate.check();
    if (!matched) {
        return res.status(400).json({ msg: validate.errors });
    }
    try {
        let institutionExists = await Institution.findOne({ where: { institution_name: institution_name } });
        if (institutionExists) {
            return res.status(400).json({ msg: 'Institution already exists' });
        }
        let institutionData = await Institution.create({ institution_name: institution_name });
        res.status(200).json({ msg: 'Institution added successfully', institutionData });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

const getInstitutions = async (req, res) => {
    try {
        let institutions = await Institution.findAll();
        res.status(200).json({ institutions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

const updateInstitutions = async(req,res) => {
    const { institution_name  } = req.body;
    const id = req.params.id;

    const validate = new Validator(req.body, {
        institution_name: 'required',
    });
    const matched = await validate.check();
    if (!matched) {
        return res.status(400).json({ msg: validate.errors });
    }

    let institutionExists = await Institution.findOne({ where: { institution_name: institution_name , id: { [Op.ne]: id } } });
    if (institutionExists) {
        return res.status(400).json({ msg: 'Institution already exists' });
    }

    try{
        const updateInstitution = await Institution.update({ institution_name: institution_name }, { where: { id: id } });
        if(updateInstitution){
            res.status(200).json({ msg: 'Institution updated successfully'});
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send(err.message);
    }
}

module.exports = {
    addInstitution,
    getInstitutions,
    updateInstitutions
}