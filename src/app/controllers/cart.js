const { addOne } = require('../../lib/cart')
const Cart = require('../../lib/cart')

const LoadProductService = require('../services/LoadProduct')

module.exports = {
  async index(req, res) {
    try{
      let { cart } = req.session

      //gerenciador de carrinho
      cart = Cart.init(cart)

      return res.render('cart/index', { cart })
    }
    catch(err) {
      console.error(err)
    }
  },
  async addOne(req, res) {
    //Pegar o id do produto e o produto
    const { id } = req.params
    const product = await LoadProductService.load('product', { where: { id } })

    //Pegar o carrinho da sessão
    let { cart } = req.session

    //Adicionar o produto ao carrinho (Usando nosso gerenciador de carrinho)
    cart = Cart.init(cart).addOne(product)

    //Atualizar o carrinho da sessão
    req.session.cart = cart

    //Redirecionar o usuário para a tela do carrinho
    return res.redirect('/cart')
  }
}