const Route = require('../models/route');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// GET all routes
const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving routes', error: err.message });
    }
};

// GET routes by userId
const getRoutesByUser = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: 'Missing userId' });
        }

        const routes = await Route.find({ userId })
            .populate('MotorcycleId', 'MotorcycleBrand MotorcycleModel ImagePath')
            .exec();

        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user routes', error: err.message });
    }
};


// POST add route (with uploaded file)
const addRoute = async (req, res) => {
    try {
        const {
            name,
            date,
            duration,
            startTime,
            endTime,
            maxSpeed,
            averageSpeed,
            distance,
            userId,
            MotorcycleId
        } = req.body;

        const filePath = req.file ? req.file.path : null;

        if (!filePath) {
            return res.status(400).json({ message: 'Missing route GPS file' });
        }

        const newRoute = new Route({
            name,
            date,
            duration,
            startTime,
            endTime,
            maxSpeed,
            averageSpeed,
            distance,
            filePath,
            userId,
            MotorcycleId
        });

        await newRoute.save();
        res.status(201).json(newRoute);
    } catch (err) {
        res.status(400).json({ message: 'Error adding route', error: err.message });
    }
};

const updateRoute = async (req, res) => {
    try {
        const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoute);
    } catch (err) {
        res.status(400).json({ message: 'Error updating route', error: err.message });
    }
};

const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);

        if (route && route.filePath) {
            fs.unlink(route.filePath, (err) => {
                if (err) console.warn('Failed to delete file:', err);
            });
        }

        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting route', error: err.message });
    }
};

module.exports = {
    getAllRoutes,
    getRoutesByUser,
    addRoute,
    updateRoute,
    deleteRoute
};
