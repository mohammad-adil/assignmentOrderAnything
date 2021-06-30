const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const orderModel = require('../models/order')

module.exports = async (req, res) => {
	try {
		const token = req.headers.authorization
		if (token) {
			const decodedToken = jwt.decode(token)
			const query = { _id: decodedToken._id }
			const { cart } = await userModel.findById(query)
			if (cart.items.length) {
				let order = new orderModel({
					orderby: decodedToken._id,
					items: cart.items
				})

				orderPromise = order.save()
				const updateObj = {
					"$set": {
						cart: { items: [] }
					}
				}
				const updateUserPromise = userModel.findOneAndUpdate(query, updateObj, { new: true })
				const [updateUser, orderdata] = await Promise.all([updateUserPromise, orderPromise])
				return res.status(200).json({ data: orderdata })
			} else {
				return res.status(200).json({ 'message': 'Cart is Empty' })
			}
		} else {
			return res.status(404).json({ 'message': 'No Data' })
		}
	}
	catch (err) {
		console.log(err)
		return res.status(504).json({ 'message': 'Something went wrong' })
	}
}