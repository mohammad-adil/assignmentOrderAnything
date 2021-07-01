const controller = require('./controller')
const express = require('express')
const router = new express.Router()


router.get('/items', controller.getItems)

router.get('/getcart', controller.getCart)

router.post('/signup', controller.signup)

router.post('/additems', controller.additems)

router.post('/login', controller.login)

router.post('/order', controller.placeOrder)

router.patch('/updatecart', controller.updateCart)


// ADMIN ROUTES
router.get('/allorders', controller.admin.getAllOrders)

router.get('/deliveryperson', controller.admin.getAllDeliveryPerson)

router.patch('/order/update', controller.admin.assignDeliveryPersonToOrder)


// DELIVERY PERSON ROUTES
router.patch('/delivery/order/update', controller.deliveryPerson)

module.exports = router