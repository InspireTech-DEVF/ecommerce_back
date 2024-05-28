import Cart from '../models/Cart.js'
import User from '../models/User.js'
import Item from '../models/Item'

//POST para agregar un producto al carrito
const addItem = async (req,res) =>{
    try{
        const cartItem = req.body
        //Validar que los datos estén completos
        if(!cartItem){
            return res.status(400).json({ msg: 'Cart data is missing' })
        }

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

export{
    addItem
}