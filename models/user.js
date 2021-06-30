const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema

const cartSchema = new Schema({
	items: [{
		item_id: {
			type: Schema.Types.ObjectId,
			ref: 'item',
			required: true
		},
		quantity: {
			type: Number,
			default: 1
		}
	}]
})

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		lowercase: true
	},
	phone_number: {
		type: Number,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	user_type: {
		type: String,
		enum: ['CUSTOMER', 'DELIVERY PERSON']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	orderAlloted: {
		type: Boolean,
		default: false
	},
	orderAllotedId: {
		type: Schema.Types.ObjectId,
		ref: 'order'
	},
	cart: cartSchema
})

userSchema.pre('save', async function() {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('user', userSchema)