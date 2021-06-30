const jwt = require('jsonwebtoken')
const orderModel = require('../models/order')
const userModel = require('../models/user')

exports.getAllOrders = async (req, res) => {
	try {
		const token = req.headers.authorization
		if (token) {
			const decodedToken = jwt.decode(token)
			const query = { _id: decodedToken._id }
			const user = await userModel.findOne(query)
			if (user.isAdmin) {
				const orderQuery = {}
				if (req.query.status) {
					orderQuery.status = req.query.status
				}
				const order = await orderModel.find(orderQuery)
				return res.status(200).json({ data: order })
			} else {
				return res.status(404).json({ 'message': 'No Data' })
			}
		} else {
			return res.status(404)
		}
	}
	catch (err) {
		console.log(err)
		return res.status(504).json({ 'message': 'Something went wrong' })
	}
}

exports.getAllDeliveryPerson = async (req, res) => {
	try {
		const token = req.headers.authorization
		if (token) {
			const decodedToken = jwt.decode(token)
			const query = { _id: decodedToken._id }
			const user = await userModel.findOne(query)
			console.log(user)
			if (user.isAdmin) {


				const userQuery = { user_type: 'DELIVERY PERSON' }
				if (req.query.available) {
					userQuery.orderAlloted = false
				}
				const deliveryPersons = await userModel.find(userQuery)
				return res.status(200).json({ data: deliveryPersons })
			} else {
				return res.status(404).json({ 'message': 'No Data' })
			}
		} else {
			return res.status(404)
		}
	}
	catch (err) {
		console.log(err)
		return res.status(504).json({ 'message': 'Something went wrong' })
	}
}

exports.assignDeliveryPersonToOrder = async (req, res) => {
	try {
		const token = req.headers.authorization
		if (token) {
			const decodedToken = jwt.decode(token)
			const query = { _id: decodedToken._id }
			const user = await userModel.findOne(query)
			if (user.isAdmin) {
				const deliveryPersonId = req.body.id
				const orderId = req.body.order_id
				const userQuery = { _id: deliveryPersonId }
				const orderQuery = { _id: orderId }
				const updateObjUser = {
					"$set": { orderAlloted: true, orderAllotedId: orderId }
				}
				const updateObjOrder = {
					"$set": { assigned_to: deliveryPersonId }
				}
				const userAlloted = userModel.findOneAndUpdate(userQuery, updateObjUser, { new: true })
				const updatedOrder = orderModel.findOneAndUpdate(orderQuery, updateObjOrder, { new: true })
				const data = await Promise.all([userAlloted, updatedOrder])
				return res.status(200).json({ data })
			} else {
				return res.status(404).json({ 'message': 'No Data' })
			}
		} else {
			return res.status(404)
		}
	}
	catch (err) {
		console.log(err)
		return res.status(504).json({ 'message': 'Something went wrong' })
	}
}