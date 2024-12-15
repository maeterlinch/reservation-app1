const express = require('express')
const userRoutes = express.Router()
const User  = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

userRoutes.post('/login', async function(req, res) {
  const { email, password } = req.body

  if(!email) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'User is not exist!' }] })
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
    }
  
    const token = jwt.sign({
      userId: foundUser._id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)  

  } catch (err) {
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!' }] })
  }

})

userRoutes.post('/:register', async function(req, res) {
  const { username, email, password, confirmPassword } = req.body
    // /* 上と下は同じ意味
  // const username = req.body.username
  // const email = req.body.email
  // const password = req.body.password
  // const confirmPassword = req.body.confirmPassword
  // */

  if(!username) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'ユーザー名を入力してください！'}]})
  }
  if(!email) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
  }
  if(password !== confirmPassword) {
    return res.status(422).send({errors: [{title: 'User error', detail: 'Please check passwords!'}]})
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'User already exists!' }] })
    }

    const user = new User({ username, email, password });
    await user.save();
    return res.json({ registered: true });
    
  } catch (err) {
    console.error('Error occurred during login:', err);
    return res.status(422).send({ errors: [{ title: 'User error', detail: 'Something went wrong!' }] })
  }
  
})

module.exports = userRoutes
//module.exports = router