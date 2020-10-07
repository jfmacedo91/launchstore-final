const express = require('express')
const routes = express.Router()

const homeController = require('../app/controllers/home')

const products = require('./products')
const users = require('./users')
const cart = require('./cart')
const orders = require('./orders')

routes.get('/', homeController.index)

routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)
routes.use('/orders', orders)

//Alias (Atalhos)
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create')
})
routes.get('/accounts', (req, res) => {
  return res.redirect('/users/login')
})

module.exports = routes