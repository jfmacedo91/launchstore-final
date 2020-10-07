const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/cart')

routes.get('/', CartController.index)
  .post('/:id/add-one', CartController.addOne)

module.exports = routes