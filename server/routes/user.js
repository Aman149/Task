const express = require('express')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { User, Course, Admin } = require('../db');
const { SECRET } = require('../middleware/auth');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();