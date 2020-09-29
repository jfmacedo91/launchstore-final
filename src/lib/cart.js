const { formatPrice } = require('./utils')

const Cart = {
  init(oldCart) {
    if(oldCart) {
      this.items = oldCart.items
      this.total = oldCart.total
    } else {
      this.items = []
      this.total = {
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      }
    }

    return this
  },
  addOne(product) {
    let inCart = this.items.find(item => item.product.id == product.id)

    if(!inCart) {
      inCart = {
        product: {
          ...product,
          formattedPrice: formatPrice(product.price)
        },
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      }

      this.items.push(inCart)
    }

    if(inCart.quantity >= product.quantity) return this

    inCart.quantity++
    inCart.price = inCart.product.price * inCart.quantity
    inCart.formattedPrice = formatPrice(inCart.price)

    this.total.quantity++
    this.total.price += inCart.product.price
    this.total.formattedPrice = formatPrice(this.total.price)

    return this
  },
  removeOne(productId) {
    //Pegar o item do carrinho
    const inCart = this.items.find(item => item.product.id == productId)

    if(!inCart) return this

    //Atualizar o item
    inCart.quantity--
    inCart.price = inCart.product.price * inCart.quantity
    inCart.formatPrice = formatPrice(inCart.price)

    //Atualizar o carrinho
    this.total.quantity--
    this.total.price -= inCart.product.price
    this.total.formattedPrice = formatPrice(this.total.price)

    if(inCart.quantity < 1) {
      this.items = this.items.filter(item => item.product.id != inCart.product.id)
      return this
    }

    return this
  },
  delete(productId) {}
}

const product = {
  id: 1,
  price: 1200,
  quantity: 2
}

const product2 = {
  id: 2,
  price: 200,
  quantity: 1
}

console.log('add first cart item')
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('add secondy cart item')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('add third cart item')
oldCart = Cart.init(oldCart).addOne(product2)
console.log(oldCart)

console.log('remove one item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)

console.log('remove one item again')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)

module.exports = Cart