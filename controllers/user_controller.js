const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Replace with a secure key

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the Users collection
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

// Add a new user
const addUser = async (req, res) => {
    try {
        const {UserEmail, UserName, UserPassword } = req.body;
        console.log(UserEmail, UserName, UserPassword)
        // Validate required fields
        if (!UserEmail || !UserName || !UserPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ UserEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user document
        const newUser = new User({
            UserEmail,
            UserName,
            UserPassword, // Store hashed password
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: { UserEmail, UserName } });
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error: error.message });
    }
};

// Update an existing user by ID
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and update user document
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete user document
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Login function
const loginUser = async (req, res) => {
    try {
        //console.log(req.body);
        const { userEmail, userPassword } = req.body;
        const UserEmail=userEmail;
        const password=userPassword;
        //console.log(UserEmail);
        //console.log(password);
        // Check if user exists
        const user = await User.findOne({ UserEmail });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        //console.log("User found:", user);

        // Check if UserPassword exists
        if (!user.UserPassword) {
            return res.status(500).json({ message: "User's password is missing from the database" });
        }
        //console.log("Entered password:", password);
        //console.log("Stored hashed password:", user.UserPassword);

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.UserPassword);
        
        //console.log("Password comparison result:", isMatch); // Should be true if correct

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.UserEmail }, JWT_SECRET, {
            expiresIn: '1h',
        });
        //console.log("JWT_SECRET:", JWT_SECRET);
        if (!JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret key is missing" });
        }

        res.json({success: true, token, user: { id: user._id, UserEmail: user.UserEmail, UserName: user.UserName } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { getUsers, addUser, updateUser, deleteUser, loginUser };
