const express = require('express')
//const router = express.Router()
const productRoutes = express.Router()
const product = require('../model/product')

//router.get('', async(_req, res) =>{
//Product.find().then((err, result) => {
//    console.log("result")
//    if (err) {
//      res.send(err)
//    }
//    res.json(result)
//  })
//});

productRoutes.get('', async function(_req, res) {
  foundProducts = await product.find({})
  return res.json(foundProducts)

})

productRoutes.get('/:productId', async function(req, res) {
  const productId = req.params.productId

  try {
    foundProduct = await product.findById(productId, {})
    return res.json(foundProduct)

  } catch(err) {
      return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found!'}]})
  }
})

//router.get('/:productId', UserCtrl.authMiddleware, function(req, res) {
//  const productId = req.params.productId
//  
//  Product.findById(productId, function(err, foundProduct) {
//    if(err) {
//      return res.status(422).send({errors: [{title: 'Product error', detail: 'Product not found!'}]})
//    }
//
//    return res.json(foundProduct)
//  })
//})

module.exports = productRoutes
//module.exports = router