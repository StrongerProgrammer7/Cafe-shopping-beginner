const { Router } = require('express');
const controller = Router();
const login = require('../service/login');
const register = require('../service/register');

controller.post("/login",login)
controller.post("/register",register)

module.exports = controller;