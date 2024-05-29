import Cart from '../models/Cart.js'
import User from '../models/User.js'
import Item from '../models/Item'
import jwt from 'jwt-simple'


//POST para agregar un producto al carrito
const addItem = async (req,res) =>{
    try{
        const cartItem = req.body
        //Validar que los datos estén completos
        if(!cartItem){
            return res.status(400).json({ msg: 'Cart data is missing' })
        }
  
        // Revisar el token en el Header para obtener el usuario del comprador
        const authHeader = req.headers.authorization
        const [bearer, token] = authHeader.split(' ') // String a Arreglo: ['Bearer', 'token']
        if (bearer !== 'Bearer') {
        return res.status(400).json({ message: 'Authorization header format is Bearer {token}' })
        }

        // Verificar que el token no sea vacío
         if (!token) {
            return res.status(400).json({ message: 'Token is required' })
        }

        const payload = jwt.decode(token, process.env.SECRET)
        //Obtener el ID del comprador
        //cartItem.user_Id

        //Si se tiene la información del comprador y del producto se crea el producto en el carrito?
        const newItem = await Cart.create(cartItem)
        res.status(201).json(newBook)

        //cartItem.User = 

    }catch(err){
        res.status(400).json({error:err.message})
    }

}

//GET para ver los productos en el carrito
const getCartItems = async (req, res) =>{
    try {
        const cartData = req.body
        //Comprobar id en la petición con id en la bd, si el usuario tiene productos en el carrito, regresar respuesta con lista de productos
        const items = await Cart.find({user_id: cartData.user_id})
        if(!items) {
            return res.status(404).json({ msg: 'No cart data found' })
        }
        res.status(200).json(items)
      }catch (error) {
        res.status(400).json({ error: error.message })
      }
}

//PATCH para editar información en un producto del carrito
const editCartItem = async (req,res) =>{
    try{

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

//DELETE para vaciar el carrito
const deleteCart = async (req,res) =>{
    try{

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

//DELETE O (PATCH?) BY ID para modificar o eliminar un producto
const updateItemByIdCart = async (req,res) =>{
    try{

    }catch(error){
        res.status(400).json({ error: error.message })
    }
}

//GET para obtener la suma total de los productos?

export{
    addCartItem,
    getCartItems,
    editCartItem,
    deleteCart,
    updateItemByIdCart
}