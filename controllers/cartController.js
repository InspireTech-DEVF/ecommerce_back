import Cart from '../models/Cart.js';
import User from '../models/User.js';
import Item from '../models/Item.js';
import jwt from 'jwt-simple';

// POST para agregar un producto al carrito
const addItem = async (req, res) => {
    try {
        const cartItem = req.body;

        // Validar que los datos estén completos
        if (!cartItem || !cartItem.item_id || !cartItem.quantity) {
            return res.status(400).json({ msg: 'Cart data is incomplete' });
        }

        // Revisar el token en el Header para obtener el usuario del comprador
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({ message: 'Authorization header is missing' });
        }

        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(400).json({ message: 'Authorization header format is Bearer {token}' });
        }

        // Decodificar el token para obtener el payload
        const payload = jwt.decode(token, process.env.SECRET);
        const userId = payload.id; // Asegúrate de que el token contenga el ID del usuario

        // Asignar el ID del usuario al artículo del carrito
        cartItem.user_id = userId;

        // Crear el producto en el carrito
        const newItem = await Cart.create(cartItem);
        res.status(201).json(newItem);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET para ver los productos en el carrito
const getCartItems = async (req, res) => {
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

        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH para editar información en un producto del carrito
const editCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
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

// DELETE para vaciar el carrito
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

        const payload = jwt.decode(token, process.env.SECRET);
        const userId = payload.id;

        await Cart.deleteMany({ user_id: userId });
        res.status(200).json({ msg: 'Cart has been emptied' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE o PATCH BY ID para eliminar un producto
const updateItemByIdCart = async (req, res) => {
    try {
        const { itemId } = req.params;

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

        const item = await Cart.findOneAndDelete({ _id: itemId, user_id: userId });
        if (!item) {
            return res.status(404).json({ msg: 'Item not found or unauthorized' });
        }

        res.status(200).json({ msg: 'Item has been deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
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

export {
    addItem,
    getCartItems,
    editCartItem,
    deleteCart,
    updateItemByIdCart,
    getCartTotal
};
