/** define main router */
const mainRouter = require("express").Router();
/** import product router */
const { productRouter } = require("./product.routes");

/** initialize product router */
mainRouter.use("/products", productRouter);

module.exports = {
	mainRouter,
};
