import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { addItem,getCartItems, updateCartItemById, deleteCart,deleteItemByIdCart,getCartTotal, clearCart, createOrder, getOrders } from '../controllers/cartController.js'


const cartRoutes = express.Router()

cartRoutes.post('/', isAuth, addItem)
cartRoutes.get('/', isAuth, getCartItems)
cartRoutes.patch('/:itemId', isAuth, updateCartItemById)
cartRoutes.patch('/', isAuth, deleteCart)
// cartRoutes.delete('/:cartId', isAuth, deleteItemByIdCart) 
cartRoutes.delete('/', isAuth, deleteCart) // Ruta para limpiar todo el carrito
cartRoutes.delete('/:itemId', isAuth, deleteItemByIdCart) // Ruta para eliminar un ítem específico del carrito
cartRoutes.get('/total', isAuth, getCartTotal)
cartRoutes.patch('/clear', isAuth, clearCart); // Ruta para limpiar el carrito
// cartRoutes.get('/order', isAuth, createOrder); 
cartRoutes.get('/order/:firstItemId', isAuth, createOrder);
cartRoutes.get('/order',isAuth,getOrders);

export default cartRoutes