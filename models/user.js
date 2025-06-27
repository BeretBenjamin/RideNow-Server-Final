const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    UserId: { type: String,default: uuidv4, required: true },
    UserEmail: { type: String, required: true },
    UserName: { type: String, required: true },
    UserPassword: { type: String, required: true }, // Hash 
});

// Hash 
UserSchema.pre('save', async function (next) {
    if (!this.isModified('UserPassword')) return next();
    const salt = await bcrypt.genSalt(10);
    this.UserPassword = await bcrypt.hash(this.UserPassword, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
