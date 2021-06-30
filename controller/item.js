const itemModel = require('../models/item')

module.exports = async (req, res) => {
	try {
		const query = {}
		if(req.query._id) {
			query['_id'] = req.query._id
		}
		const item = await itemModel.find(query)
		return res.status(200).json({ data: item })
	}
	catch(err) {
		console.log(err)
		return res.status(504).json({ 'message':'Something went wrong' })
	}
}
