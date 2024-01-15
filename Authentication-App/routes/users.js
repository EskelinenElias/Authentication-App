var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User registration route
router.post('/api/user/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('This email is already registered.');
        }
        const user = new User({ username, password });
        await user.save()
        res.send('Successfully registered user.') 
    } catch (error) {
        res.status(500).send("Failed to register user.")
    }
});

module.exports = router;
