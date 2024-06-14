import { trusted } from 'mongoose';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import jwt from 'jwt-simple';

// POST para agregar un producto al carrito
const addItem = async (req, res) => {
    try {
        const cartItem = req.body;

        console.log('Received cart item:', cartItem); // Log del ítem recibido

        // Validar que los datos estén completos
        if (!cartItem || !cartItem.item_id || !cartItem.quantity || !cartItem.unitPrice) {
            return res.status(400).json({ msg: 'Cart data is incomplete' });
        }

       const userId = req.user.id;
       cartItem.user_id = userId;

        // Buscar el producto en la base de datos
        const item = await Item.findById(cartItem.item_id);
        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        // Verificar si el artículo ya está en el carrito del usuario
        const existingCartItem = await Cart.findOne({ user_id: userId, item_id: item._id });
        
        if (existingCartItem) {
            // Si el artículo ya existe, incrementar la cantidad
            existingCartItem.quantity += cartItem.quantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        } else {
            // Si el artículo no existe, agregarlo al carrito
            cartItem.item_id = item._id;
            const newItem = await Cart.create(cartItem);
            return res.status(201).json(newItem);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// PATCH para vaciar el carrito (marcar como inactivo)
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await Cart.updateMany({ user_id: userId, isOrder: false }, { isActive: false });
        res.status(200).json({ msg: 'Cart cleared successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// GET para ver los productos en el carrito
const getCartItems = async (req, res) => {
    try {
        //Validar información del usuario
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
        }

        const payload = jwt.decode(token, process.env.SECRET);
        const userId = payload.id;

        //Buscar los productos que coincidan con el usuario en sesión
        const items = await Cart.find({ user_id: userId, isActive: true, isOrder:false }).populate('item_id');
        if (!items || items.length === 0) {
            return res.status(404).json({ msg: 'No cart data found' });
        }

        //Respuesta con los productos con el Id del usuario y el Id del Producto
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//getorder
const getOrders = async (req, res) => {
    try {
        //Validar información del usuario
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
        }

        const payload = jwt.decode(token, process.env.SECRET);
        const userId = payload.id;

        //Buscar los productos que coincidan con el usuario en sesión
        const orders = await Cart.find({ user_id: userId, isOrder:true }).populate('item_id');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ msg: 'No cart data found' });
        }

        // Respuesta con las órdenes del usuario
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH para editar información en un producto del carrito
const updateCartItemById = async (req, res) => {
    try {

        //Validar información del usuario
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }
    
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
                return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
            }
    
        //const payload = jwt.decode(token, process.env.SECRET);
        //const userId = payload.id;

        
        const { itemId } = req.params;
        //Validar existencia del item en la base de datos
        if (
            !itemId ||
            typeof itemId !== "string" ||
            !itemId.match(/^[0-9a-fA-F]{24}$/)
          ) {
            return res.status(400).json({ msg: "Invalid item ID" });
          }

        const updates = req.body;

        const updatedItem = await Cart.findByIdAndUpdate(itemId, updates, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ msg: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH para vaciar el carrito
const deleteCart = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
        }


        //await Cart.deleteMany({ user_id: userId });
        const emptied = await Cart.findByIdAndUpdate(
            //req.params.user_id,
            //El id del mismo carrito se setea en falso para que el usuario pueda tener otro carrito después?
            _id,
            { isActive: false },
            { new: false }
          );
          if(!emptied){
            return res.status(404).json({ msg: "Cart not found" });
          }
        res.status(200).json({ msg: 'Cart has been emptied' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteItemByIdCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        // Verificar que el ID del artículo esté presente
        if (!itemId) {
            return res.status(400).json({ msg: 'Item ID is required' });
        }

        // Buscar y eliminar el artículo del carrito
        const deletedItem = await Cart.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ msg: 'Item not found in cart' });
        }

        res.status(200).json({ msg: 'Item removed from cart successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// GET para obtener la suma total de los productos
const getCartTotal = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
        }

        const payload = jwt.decode(token, process.env.SECRET);
        const userId = payload.id;

        const items = await Cart.find({ user_id: userId }).populate('item_id');
        if (!items || items.length === 0) {
            return res.status(404).json({ msg: 'No cart data found' });
        }

        const total = items.reduce((sum, item) => sum + item.item_id.price * item.quantity, 0);
        //items.sumTotal = total

        res.status(200).json({ total });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstItemId } = req.params;

        // Obtener el producto del carrito según el ID proporcionado
        const cartItem = await Cart.findOne({ _id: firstItemId, user_id: userId, isActive: true });
        if (!cartItem) {
            return res.status(400).json({ msg: 'No item in cart to update' });
        }

        // Marcar el item del carrito como parte de una orden
        await Cart.updateOne({ _id: firstItemId, user_id: userId }, { isOrder: true });

        res.status(200).json({ msg: 'Cart item marked as ordered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};









export {
    addItem,
    getCartItems,
    updateCartItemById,
    deleteCart,
    deleteItemByIdCart,
    getCartTotal,
    clearCart,
    createOrder,
    getOrders
    
};

