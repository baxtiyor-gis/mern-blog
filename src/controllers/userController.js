const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const signIn = asyncHandler(async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) {
    res.status(400)
    throw new Error('Plesa add all fields')
  }
  const user = await User.findOne({ login })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error('Login or password wrong!')
  }
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  })
  res.status(200).json({
    login: user.login,
    email: user.email,
    name: user.name,
    surname: user.surname,
    token,
  })
})

const signUp = asyncHandler(async (req, res) => {
  const { login, password, email, name, surname, phone } = req.body
  if (!login || !password || !email || !name || !surname || !phone) {
    res.status(400)
    throw new Error('Plesa add all fields')
  }
  const checkEmail = await User.findOne({ email })
  const checkLogin = await User.findOne({ login })
  if (checkEmail) {
    res.status(409)
    throw new Error('Email already exists')
  } else if (checkLogin) {
    res.status(409)
    throw new Error('Login already exists')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    login,
    email,
    name,
    surname,
    phone,
    password: hashedPassword,
  })
  res.status(201).json(user)
})

module.exports = {
  signIn,
  signUp,
}
