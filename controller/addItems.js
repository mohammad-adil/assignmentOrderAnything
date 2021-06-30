const itemModel = require('../models/item')
const itemArray = require('./itemArray')


let addItems = async (req, res) => {
	try {
		const items = await itemModel.insertMany(itemArray)
		console.log('Items added')
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = addItems