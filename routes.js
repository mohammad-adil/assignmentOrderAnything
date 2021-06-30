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
router.get('/allorders', controller.admin.getAllOrders)//working

router.get('/deliveryperson', controller.admin.getAllDeliveryPerson)//working

router.patch('/order/update', controller.admin.assignDeliveryPersonToOrder) // working


// DELIVERY PERSON ROUTES
router.patch('/delivery/order/update', controller.deliveryPerson)//working 

module.exports = router