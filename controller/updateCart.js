const jwt = require('jsonwebtoken')
const userModel = require('../models/user')


let updateCart = async (req, res) => {
    try {
        const token = req.headers.authorization
        if (token) {
            const decodedToken = jwt.decode(token)
            const items = req.body



            const query = { _id: decodedToken._id }
            const updateObj = {
                "$set": {
                    "cart.items": items
                }
            }

            console.log(updateObj)

            const { cart } = await userModel.findOneAndUpdate(query, updateObj, { new: true })
            console.log(cart)



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

module.exports = updateCart