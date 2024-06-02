import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'


// CREATE para dar de alta un usuario

const createUser = async (req, res) => {
    try {
      // const userData = req.userData
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email or pwd are required' })
      }
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
      req.body.password = hashedPassword
  
      const newUser = await User.create(req.body)
      newUser.password = undefined
  
      return res.status(201).json({
        msg: 'user created successfully',
        user: newUser
      })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

// Create para iniciar sesión
const login = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }
      const user = await User.findOne({ email: req.body.email })
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
    }
      const isPwdValid = await bcrypt.compare(req.body.password, user.password)
      if (!isPwdValid) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
  
      const payload = {
        id: user._id,
        userName: user.userName,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + (60 * 60 * 24 * 7))
      }
      const token = jwt.encode(payload, process.env.SECRET)
  
      return res.status(200).json({
        msg: 'Login successful',
        token
      })
    } catch (error) {
        return res.status(400).json({ message: `Error logging in: ${error.message}` })
    }
  }

// Read para ver lista de usuarios
const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ isActive: true })
      if (!users || users.length === 0) {
        return res.status(404).json({ msg: 'No active users found' })
      }
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }


// Read para ver la lista de clientes
const getClients = async (req, res) => {
    try {
      const clients = await User.find({ role: 'CUSTOMER' })
      if (!clients || clients.length === 0) {
        return res.status(404).json({ msg: 'No active clients found' })
      }
      res.status(200).json(clients)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  export {
    createUser,
    login,
    getAllUsers,
    getClients
  }