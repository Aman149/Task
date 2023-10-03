const express = require('express')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Course, Admin } = require('../db');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();
router.get('/me', authenticateJwt, async(req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if(!admin) {
        res.send(403).json({
            msg: 'Admin dones not exists'
        })
    }
    res.json({
        username: admin.username
    })
});

router.post('/signup/signup', (req, res) => {
    const { username, password }  =req.body;
    const isAdminAlreadyExists = Admin.findOne({ username });
    if(isAdminAlreadyExists) {
        res.send(403).json({ msg: 'Admin user already exists!'});
    } else {
        const obj = {username: username, password: password};
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const token = jwt.sign({ username, role: 'admin'}, SECRET, {expiresIn: '1h'});
        res.send(200).json({message: 'Admin user created successfully', token});
    }
});

router.get()