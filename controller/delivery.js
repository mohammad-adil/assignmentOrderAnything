const jwt = require('jsonwebtoken')
const orderModel = require('../models/order')
const userModel = require('../models/user')

const StatusArray = ['ORDER PLACED', 'REACHED STORE', 'ITEMS PICKED', 'ENROUTE', 'DELIVERED', 'CANCELLED']

module.exports = async (req, res) => {
	try {
		const token = req.headers.authorization
		console.log(token)

		if (token) {
			const decodedToken = jwt.decode(token)
			const query = { _id: decodedToken._id }
			const user = await userModel.findOne(query)

			console.log(user)

			const { status } = req.body
			isValidStatus = StatusArray.indexOf(status)




			if (isValidStatus !== -1) {
				const queryOrder = { _id: user.orderAllotedId }
				const updateObj = { "$set": { status } }

				console.log(queryOrder)



				const updatedOrder = await orderModel.findOneAndUpdate(queryOrder, updateObj)
				console.log(updatedOrder)




				res.status(200).json({ data: updatedOrder })
				if (updatedOrder.status === 'DELIVERED') {
					userUpdateObj = {
						"$set": {
							orderAlloted: false,
							orderAllotedId: null
						}
					}
					const updateUser = await userModel.findOneAndUpdate(query, userUpdateObj, { new: true })
				}
			} else {
				return res.status(200).json({ 'message': 'Status Not Valid' })
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