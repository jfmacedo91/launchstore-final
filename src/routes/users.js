const express = require('express')
const routes = express.Router()
const sessionController = require('../app/controllers/session')
const userController = require('../app/controllers/user')

// //Login/Logout
// routes.got('/login', sessionController.loginForm)
// routes.post('/login', sessionController.login)
// routes.post('/logout', sessionController.logout)

// //Reset password/Forgot
// routes.get('/forgot-password', sessionController.forgotForm)
// routes.get('/password-reset', sessionController.resetForm)
// routes.post('/forgot-password', sessionController.forgot)
// routes.post('/password-reset', sessionController.reset)

// //User register
routes.get('/register', userController.registerForm)
// routes.post('/register', userController.post)

// routes.get('/', userController.show)
// routes.put('/users', userController.update)
// routes.delete('/users', userController.delete)

module.exports = routes