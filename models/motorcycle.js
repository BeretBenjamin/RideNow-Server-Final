const mongoose = require('mongoose');

const MotorcycleSchema = new mongoose.Schema({
    MotorcycleId: {type: String, required: true},
    MotorcycleBrand: { type: String, required: true },
    MotorcycleModel: { type: String, required: true },
    MotorcycleYear: { type: Number, required: true },
    MotorcyclePower: { type: Number, required: true },
    UserId: { type: String, required: true }, // Link to the user's UserId
    ImagePath: { type: String } // Stores the image file path
});

module.exports = mongoose.model('Motorcycle', MotorcycleSchema);
