const mongoose = require('mongoose')
const Schema = mongoose.Schema

const availableAtSchema = new Schema({
	address: {
		type: String,
		required: true
	},
	lat: {
		type: Number
	},
	long: {
		type: Number
	}
})

const itemSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	category: {
		type: String,
		required: true,
		lowercase: true
	},
	available_at: [
		availableAtSchema
	]
})

module.exports = mongoose.model('item', itemSchema)