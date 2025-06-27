/*const express = require('express');
const { getMotorcycles, addMotorcycle, updateMotorcycle, deleteMotorcycle } = require('../controllers/motorcycle_controller');

const router = express.Router();

router.get('/', getMotorcycles);
router.post('/', addMotorcycle);
router.put('/:id', updateMotorcycle);
router.delete('/:id', deleteMotorcycle);

module.exports = router;
*/
const express = require('express');
const {
    getMotorcycles,
    addMotorcycle,
    updateMotorcycle,
    deleteMotorcycle,
    getAllMotorcycles
} = require('../controllers/motorcycle_controller');

const upload = require('../utils/upload'); 

const router = express.Router();

// Routes
router.get('/all',getAllMotorcycles);
router.get('/', getMotorcycles);
router.post('/', upload.single('image'), addMotorcycle); 
router.put('/:id', updateMotorcycle);
router.delete('/:id', deleteMotorcycle);

module.exports = router;
