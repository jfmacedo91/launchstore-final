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
  },
  removeOne(req, res) {
    //Pegar o id do produto
    let { id } = req.params

    //Pegar o carrinho da sessão
    let { cart } = req.session

    //Se não tiver carrinho só retorna
    if(!cart) return res.redirect('/cart')

    //Iniciar o carrinho (Gerenciador de carrinho) e remover
    cart = Cart.init(cart).removeOne(id)

    //Atlizar o carrinho da sessão, removendo 1 item
    req.session.cart = cart

    //Redierecionamento para a pagina do cart
    return res.redirect('/cart')
  },
  delete(req, res) {
    let { id } = req.params
    let { cart } = req.session

    if(!cart) return

    cart = Cart.init(cart).delete(id)

    req.session.cart = cart

    return res.redirect('/cart')
  }
}