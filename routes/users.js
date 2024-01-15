var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// User registration route
router.post('/api/user/register', async (req, res) => {
    try {
        console.log("Registering a new user...")
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('New user not registered; email already in use.')
            return res.status(403).send('This email is already registered.');
        }
        const user = new User({ email, password });
        await user.save();
        console.log('New user registered.')
        res.send('Successfully registered user'); 
    } catch (error) {
        console.error('An error occurred while attempting to register a new user:', error);
        res.status(500).send("Failed to register user.");
    }
});

router.post('/api/user/login', async (req, res) => {
    try {
        console.log("Logging in...")
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email }, process.env.SECRET, {
            expiresIn: '1h', 
        });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error during login' });
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
