const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const router = Router()
const User = require('../models/User')

router.post(
    '/register',
    [
      check('login', 'Incorrect login(email)').isEmail(),
      check('password', 'Minimal password length is 6 symbols').isLength({min: 6}),
        check('password', 'Minimal password length is 6 symbols').isLength({min: 6}),
      check('password-confirm').isLength({min: 6}).custom((value, { req }) => {
          if (req.body.password !== value) {
              throw new Error('Password confirmation is incorrect');
          } else {
              return true
          }
      }),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }

        const {login, password} = req.body
        const exist = await User.findOne({login})

        if (exist) {
            return res.status(400).json({message: 'This login is occupied by another user!'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({login, password: hashedPassword})
        await user.save()
        res.status(201).json({message: 'User exist!'})

    }catch (e) {
        res.status(500).json({message: e.message})
    }
})

router.post('/login',
    [
        check('login', 'Enter correct login').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }

        const {login, password} = req.body
        const exist = await User.findOne({login})

        if (exist) {
            const isMatch = await bcrypt.compare(password, exist.password)

            if (!isMatch) {
                return res.status(400).json({ message:'Incorrect password' })
            }

            const token = jwt.sign(
                { userId: exist.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: exist.id})

        } else {
            return res.status(400).json({message: 'User does not exist!'})
        }

    }catch (e) {
        console.log(e)
        res.status(500).json({message: 'Some error(('})
    }
})

module.exports = router