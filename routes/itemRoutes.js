import express from "express";
import { createItem, deleteItemId, getAllItems, getItemById, updateItemById } from "../controllers/itemController.js";

const itemRouters = express.Router();

itemRouters.post("/", createItem);
itemRouters.get("/", getAllItems);
itemRouters.get("/:itemId",getItemById);
itemRouters.patch("/:itemId",updateItemById);
itemRouters.delete("/:itemId",deleteItemId);

export default itemRouters;
