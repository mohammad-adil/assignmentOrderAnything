const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

module.exports = async (req, res) => {
	try {
		const { phone_number, password } = req.body
		const query = { phone_number }
		const user = await userModel.findOne(query)
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if(isPasswordValid) {
			const obj = {
				phone_number: user.phone_number,
				_id: user._id,
				name: user.name,
			}
			const token = jwt.sign(obj, 'shhhhh');
			return res.status(200).json({ data: token })
		}
		return res.status(404).json({ message: 'Incorrect Password or Username'})
	}
	catch(err) {
		console.log(err)
		return res.status(504).json({ 'message':'Something went wrong' })
	}
}