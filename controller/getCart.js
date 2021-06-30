const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

let getCart = async (req, res) => {
    try {
        const token = req.headers.authorization
        if (token) {
            const decodedToken = jwt.decode(token)

            const query = { _id: decodedToken._id }
            const { cart } = await userModel.findOne(query).populate({
                path: "cart.items.item_id",
                select: 'name category'
            })
            return res.status(200).json({ data: cart })
        } else {
            return res.status(404)
        }
    }
    catch (err) {
        console.log(err)
        return res.status(504).json({ 'message': 'Something went wrong' })
    }
}

module.exports = getCart