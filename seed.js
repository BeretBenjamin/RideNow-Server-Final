const mongoose = require('mongoose');
const Motorcycle = require('./models/motorcycle');
const User = require('./models/user');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI; 

const seedData = async () => {
    try {
        // Connect to the database
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Add Motorcycles
        const motorcycles = [
            {
                MotorcycleId: 1,
                MotorcycleBrand: "Yamaha",
                MotorcycleModel: "YZF-R1",
                MotorcycleYear: 2021,
                MotorcyclePower: 200
            },
            {
                MotorcycleId: 2,
                MotorcycleBrand: "Ducati",
                MotorcycleModel: "Panigale V4",
                MotorcycleYear: 2022,
                MotorcyclePower: 214
            }
        ];
        await Motorcycle.insertMany(motorcycles);

        // Add Users
        const users = [
            {
                UserId: 1,
                UserEmail: "test1@example.com",
                UserName: "UserOne",
                UserPassword: "password123"
            },
            {
                UserId: 2,
                UserEmail: "test2@example.com",
                UserName: "UserTwo",
                UserPassword: "password456"
            }
        ];
        await User.insertMany(users);

        console.log("Data seeded successfully");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error.message);
        mongoose.connection.close();
    }
};

seedData();
