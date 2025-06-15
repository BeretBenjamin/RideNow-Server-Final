const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true }, // In seconds
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    maxSpeed: { type: Number, required: true },
    averageSpeed: { type: Number, required: true },
    distance: { type: Number, required: true },
    filePath: { type: String, required: true }, // Path to the .gpx or .json file on server
    //MotorcycleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Motorcycle', required: true },
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    MotorcycleId: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Route', RouteSchema);
