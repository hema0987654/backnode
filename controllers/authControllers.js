const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
let { User } = require('../model/users');
require('dotenv').config()
const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Make sure to write the password and email" });
    }

    try {
        let finduser = await User.findOne({ email });

        if (!finduser) {
            return res.json({ success: false, message: "Email not found" });
        }

        const isMatch = await bcrypt.compare(password, finduser.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Wrong password" });
        }

        const accessToken = jwt.sign({ userId: finduser._id }, process.env.SECRET_KEY, { expiresIn: '5m' });
        const refreshToken = jwt.sign({ userId: finduser._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        finduser.refreshToken = refreshToken;
        await finduser.save();

        return res.json({ success: true, message: "Login successful", accessToken, refreshToken });

    } catch (error) {
        return res.json({ success: false, message: `Error: ${error.message}` });
    }
};

let rejester = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Make sure to write the password and email" });
        }

        let finduser = await User.findOne({ email });
        if (finduser) {
            return res.status(400).json({ success: false, message: "This email is already used" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "The password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({ email, password: hashedPassword });

        const accessToken = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, { expiresIn: '5m' });

        const refreshToken = jwt.sign({ userId: newUser._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        newUser.refreshToken = refreshToken;
        await newUser.save();

        return res.status(201).json({ 
            success: true, 
            message: "Account created successfully!", 
            accessToken, 
            refreshToken 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

module.exports = { rejester, login };


