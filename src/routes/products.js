const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const searchController = require('../app/controllers/search')
const productController = require('../app/controllers/product')

//Search
routes.get('/search', searchController.index)

//Products
routes.get('/create', productController.create)
routes.get('/:id', productController.show)
routes.get('/:id/edit', productController.edit)
routes.post('/', multer.array('photos', 6), productController.post)
routes.put('/', multer.array('photos', 6), productController.put)
routes.delete('/', productController.delete)

module.exports = routes