/** define product router */
const productRouter = require("express").Router();
/** import product controllers */
const {
	listProductsController,
	getProductController,
	createProductController,
	updateProductController,
	deleteProductController,
} = require("../controllers/products.controller");

productRouter.get("/list", listProductsController);
productRouter.get("/single/:id", getProductController);
productRouter.post("/new", createProductController);
productRouter.put("/update", updateProductController);
productRouter.delete("/remove/:id", deleteProductController);

module.exports = {
	productRouter,
};
