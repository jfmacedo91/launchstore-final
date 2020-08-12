const express = require('express')
const routes = express.Router()
const products = require('./products')
const users = require('./users')
const homeController = require('../app/controllers/home')

routes.get('/', homeController.index)
routes.use('/users', users)
routes.use('/products', products)

//Alias (Atalhos)
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create')
})

module.exports = routes