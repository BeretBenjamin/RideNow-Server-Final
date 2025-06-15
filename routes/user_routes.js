const express = require('express');
const { getUsers, addUser, updateUser, deleteUser, loginUser } = require('../controllers/user_controller');

const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;
