const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv').config()
const Routes = require('./src/routes')
const connectDB = require('./src/config/db')
const { errorHandler } = require('./src/middleware/errorMiddleware')
const path = require('path')
const PORT = process.env.PORT || 2001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('tiny'))

connectDB()


app.use('/api', Routes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running, http://localhost:${PORT}`);
})