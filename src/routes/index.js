const { Router } = require("express");

const router = Router()


router.use('/user', require('./userRouter'))

module.exports = router