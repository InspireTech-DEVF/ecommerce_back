import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { addItem,getCartItems, editCartItem, deleteCart,updateItemByIdCart,getCartTotal } from '../controllers/cartController.js'


const cartRoutes = express.Router()

cartRoutes.post('/', isAuth, addItem)
cartRoutes.get('/', isAuth, getCartItems)
cartRoutes.patch('/:itemId', isAuth, editCartItem)
cartRoutes.patch('/', isAuth, deleteCart)
//cartRoutes.patch('/:cartId', isAuth, updateItemByIdCart) 
cartRoutes.get('/getCartTotal', isAuth, getCartTotal)

export default cartRoutes