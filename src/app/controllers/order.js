const LoadProductService = require('../services/LoadProduct')
const User = require('../models/User')

const mailer = require('../../lib/mailer')

const email = (seller, product, buyer) => `
  <h2>Olá ${ seller.name }</h2>
  <p>Você tem um novo pedido de compra de um produto!</p>
  <p>Produto: ${ product.name }</p>
  <p>Preço: ${ product.formattedPrice }</p>
  <p><br/><br/></p>
  <h3>Dados do comprador</h3>
  <p>Nome: ${ buyer.name }</p>
  <p>Email: ${ buyer.email }</p>
  <p>Endereço: ${ buyer.address }</p>
  <p>${ buyer.cep }</p>
  <p><br/><br/></p>
  <p>Entre em contato com o comprador para <strong>finalizar a venda</strong>!</p>
  <p><br/><br/></p>
  <p>Atenciosamente, Equipe Launchstore!</p>
`

module.exports = {
  async post(req, res) {
    try{
      //Pegar os dados do produto
      const product = await LoadProductService.load('product', { where: {
         id: req.body.id
      } })

      //Pegar os dados do vendedor
      const seller = await User.findOne({ where: { id: product.user_id } })

      //Pegar os dados do comprador
      const buyer = await User.findOne({ where: { id: req.session.userId } })

      //Enviar email com dados da compra para o vendedor
      await mailer.sendMail({
        to: seller.email,
        from: 'no-reply@launchstore.com',
        subject: 'Novo pedido de compra',
        html: email(seller, product, buyer)
      })

      //Notificar o usuário com alguma mensagem de sucesso
      return res.render('orders/success')
    }
    catch(err) {
      //Notificar o usuário com alguma mensagem de erro
      console.error(err)
      return res.render('orders/error')
    }
  }
}