const express = require('express');
const {
    getAllRoutes,
    getRoutesByUser,
    addRoute,
    updateRoute,
    deleteRoute
} = require('../controllers/route_controller');

const uploadRoute = require('../utils/upload_route'); // Handles GPS file upload

const router = express.Router();

// Routes
router.get('/all', getAllRoutes);
router.get('/', getRoutesByUser); // with query param ?userId=...
router.post('/', uploadRoute.single('gpsFile'), addRoute); // Accepts 'gpsFile' in multipart/form-data
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

module.exports = router;
