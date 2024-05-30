import { connect } from "./config/database.js";
import express from "express";
import cors from "cors";
import itemRouters from "./routes/itemRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const PORT = process.env.PORT || 3000;

connect();

const api = express();
api.use(express.json());
api.use(cors());

// Aqui van las rutas
api.use("/api/v1/items",itemRouters);
api.use("/api/v1/categories",categoryRoutes);
api.use("/api/v1/user", userRoutes);
api.use("/api/v1/cart", cartRoutes);

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});
