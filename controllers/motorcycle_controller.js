const Motorcycle = require('../models/motorcycle');
const { v4: uuidv4 } = require('uuid');


const getAllMotorcycles = async (req, res) => {
    try {
        const motorcycles = await Motorcycle.find();
        res.json(motorcycles);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving motorcycles', error: err.message });
    }
};

const getMotorcycles = async (req, res) => {
    try {
        const userId = req.query.userId; // Get it from query parameter
        if (!userId) {
            return res.status(400).json({ message: 'Missing userId' });
        }
        const motorcycles = await Motorcycle.find({ UserId: userId });
        res.json(motorcycles);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving motorcycles', error: err.message });
    }
};

/*
const addMotorcycle = async (req, res) => {
    try {
        const newMotorcycle = new Motorcycle(req.body);
        await newMotorcycle.save();
        res.status(201).json(newMotorcycle);
    } catch (err) {
        res.status(400).json({ message: 'Error adding motorcycle', error: err.message });
    }
};*/
const addMotorcycle = async (req, res) => {
    try {
        const {
            MotorcycleBrand,
            MotorcycleModel,
            MotorcycleYear,
            MotorcyclePower,
            UserId
        } = req.body;

        const imagePath = req.file ? req.file.path : null;

        const newMotorcycle = new Motorcycle({
            MotorcycleId: uuidv4(), //  Auto-generated
            MotorcycleBrand,
            MotorcycleModel,
            MotorcycleYear,
            MotorcyclePower,
            UserId,
            ImagePath: imagePath
        });
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        await newMotorcycle.save();
        res.status(201).json(newMotorcycle);
    } catch (err) {
        res.status(400).json({ message: 'Error adding motorcycle', error: err.message });
    }
};


const updateMotorcycle = async (req, res) => {
    try {
        const updatedMotorcycle = await Motorcycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMotorcycle);
    } catch (err) {
        res.status(400).json({ message: 'Error updating motorcycle', error: err.message });
    }
};

const deleteMotorcycle = async (req, res) => {
    try {
        await Motorcycle.findByIdAndDelete(req.params.id);
        res.json({ message: 'Motorcycle deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting motorcycle', error: err.message });
    }
};

module.exports = { getMotorcycles,getAllMotorcycles, addMotorcycle, updateMotorcycle, deleteMotorcycle };
