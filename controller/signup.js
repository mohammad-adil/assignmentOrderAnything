const userModel = require('../models/user')

const validateBody = (body) => {
	if (!body.name) {
		res.status().json({ message: 'Name required' })
		return
	}
	if (!body.phone_number) {
		res.status().json({ message: 'Phone Number required' })
		return
	}
	if (!body.password) {
		res.status().json({ message: 'Password required' })
		return
	}
	if (!body.user_type) {
		res.status().json({ message: 'User type required' })
		return
	}
	return 1
}

module.exports = async (req, res) => {
	try {
		const isFine = validateBody(req.body, res)
		if (isFine) {
			let user = new userModel(req.body)
			user = await user.save()
			return res.status(200).json({ data: user })
		}
	}
	catch (err) {
		console.log(err)
		return res.status(504).json({ 'message': 'Something went wrong' })
	}
}