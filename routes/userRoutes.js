import express from 'express'
import { createUser, login, getAllUsers, getClients, getMyUser } from '../controllers/userController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const userRoutes = express.Router()

userRoutes.post('/register', createUser)
userRoutes.post('/login', login)
userRoutes.get('/', isAuth, isAdmin, getAllUsers)
userRoutes.get('/clients', isAuth, isAdmin, getClients)
userRoutes.get('/me', isAuth, getMyUser)

export default userRoutes
