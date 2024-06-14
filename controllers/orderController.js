import Order from "../models/Order.js";

// Ruta para crear un Order
const createOrderRoute = async (req, res) => {
  try {
    const { cartId, total } = req.body;
    const order = new Order({
      cart_id: cartId,
      total: total,
      isActive: true,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ruta para obtener un Order con detalles del Cart
const getOrderRoute = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate("cart_id");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ruta para obtener todas las órdenes con detalles del carrito
const getAllOrdersRoute = async (req, res) => {
  try {
    const orders = await Order.find().populate("cart_id");
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createOrderRoute, getOrderRoute, getAllOrdersRoute };

