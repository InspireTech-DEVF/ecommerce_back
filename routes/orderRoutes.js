import express from "express";
import {
  createOrderRoute,
  getAllOrdersRoute,
  getOrderRoute,
} from "../controllers/orderController";

const orderRoutes = express.Router();

orderRoutes.post("/", createOrderRoute);
orderRoutes.get("/", getAllOrdersRoute);
orderRoutes.get("/:orderId", getOrderRoute);

export default { orderRoutes };
