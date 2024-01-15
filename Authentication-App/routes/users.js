var express = require('express');
var router = express.Router();
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
