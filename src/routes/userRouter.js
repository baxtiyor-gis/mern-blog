const { Router } = require("express")
const { signIn, signUp } = require("../controllers/userController");
const { protected } = require('../middleware/authMiddleware')

const router = Router()


router.post('/login', signIn)
router.post('/register', signUp)

router.get('/me', protected, (req, res) => {
    res.status(200).json({
        user: req.user
    })
})

module.exports = router