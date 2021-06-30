const express = require('express')
const app = express()
const bp = require('body-parser')
const mongoose = require('mongoose')
const Pathrouter = require('./routes')

const port = process.env.PORT || 3000

// CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/order-anything', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(Pathrouter)

app.listen(port, () => {

	console.log("Server Started at " + port)
})

