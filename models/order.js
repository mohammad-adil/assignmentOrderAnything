const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
	orderby: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true
	},
	items: [{
		_id: {
			type: Schema.Types.ObjectId,
			ref: 'item',
			required: true
		},
		quantity: {
			type: Number,
			default: 1
		}
	}],
	assigned_to: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	status: {
		type: String,
		enum: ['ORDER PLACED', 'REACHED STORE', 'ITEMS PICKED', 'ENROUTE', 'DELIVERED', 'CANCELLED'],
		default: 'ORDER PLACED'
	}
})

module.exports = mongoose.model('order', orderSchema)