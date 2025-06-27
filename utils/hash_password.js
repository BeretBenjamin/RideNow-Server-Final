const bcrypt = require('bcrypt');

//  to hash
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // salt rounds (10 is a standard value)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing password: ' + error.message);
    }
};

module.exports = { hashPassword, comparePassword };
