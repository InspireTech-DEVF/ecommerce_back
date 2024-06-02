import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { addItem,getCartItems, updateCartItemById, deleteCart,deleteItemByIdCart,getCartTotal } from '../controllers/cartController.js'


const cartRoutes = express.Router()

cartRoutes.post('/', isAuth, addItem)
cartRoutes.get('/', isAuth, getCartItems)
cartRoutes.patch('/:itemId', isAuth, updateCartItemById)
cartRoutes.patch('/', isAuth, deleteCart)
cartRoutes.delete('/:cartId', isAuth, deleteItemByIdCart) 
cartRoutes.get('/total', isAuth, getCartTotal)

export default cartRoutes