import express from 'express';
import { createItem } from '../controllers/itemController.js';

const itemRouters = express.Router();

itemRouters.post("/",createItem);

export default itemRouters;
