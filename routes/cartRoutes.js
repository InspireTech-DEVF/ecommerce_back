import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { addCartItem,getCartItems } from '../controllers/cartController.js'

const cartRoutes = express.Router()

cartRoutes.post('/addToCart', isAuth, addCartItem)
cartRoutes.get('/getCart', isAuth, getCartItems)

export default cartRoutes