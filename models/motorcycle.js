const mongoose = require('mongoose');

const MotorcycleSchema = new mongoose.Schema({
    MotorcycleId: {type: String, required: true},
    MotorcycleBrand: { type: String, required: true },
    MotorcycleModel: { type: String, required: true },
    MotorcycleYear: { type: Number, required: true },
    MotorcyclePower: { type: Number, required: true },
    UserId: { type: String, required: true }, 
    ImagePath: { type: String } 
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);
