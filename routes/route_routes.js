const express = require('express');
const {
    getAllRoutes,
    getRoutesByUser,
    addRoute,
    updateRoute,
    deleteRoute
} = require('../controllers/route_controller');

const uploadRoute = require('../utils/upload_route'); 

const router = express.Router();

// Routes
router.get('/all', getAllRoutes);
router.get('/', getRoutesByUser); 
router.post('/', uploadRoute.single('gpsFile'), addRoute); 
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

module.exports = router;
