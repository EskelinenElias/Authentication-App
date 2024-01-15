const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const address = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdb';

// connect to the database
console.log(`Connecting to MongoDB... ${address}`)
mongoose.connect(address);
mongoose.promise = Promise; 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Failed to connect to MongoDB.'))
db.once('open', () => {
    console.log("Connected to MongoDB.")
})
module.exports = db;