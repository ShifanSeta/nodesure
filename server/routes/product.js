import express  from "express";
import { getProduct, getAllProduct } from "../controllers/product.conroller.js";

const router = express.Router();



//get

router.get("/:id", getProduct);

//getall

router.get("/", getAllProduct);


export default router;