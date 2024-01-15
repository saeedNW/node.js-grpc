/** import grpc module */
const grpc = require("@grpc/grpc-js");
/** import proto loader module */
const protoLoader = require("@grpc/proto-loader");
/** load product proto file */
const productProto = protoLoader.loadSync("../proto/products.proto");
/** load product package from product proto */
const { productPackage } = grpc.loadPackageDefinition(productProto);
/** define product service URL */
const productServiceURL = "localhost:3001";

/** initialize client services */
const productClient = new productPackage.ProductService(
	productServiceURL,
	grpc.credentials.createInsecure()
);

/**
 * retrieve products list
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {function} next express next function
 * @returns {Promise<void>}
 */
async function listProductsController(req, res, next) {
	/** invoking gRPC client's 'listProducts' method to retrieve products list */
	productClient.listProducts(null, (err, data) => {
		if (err) return res.status(500).json(err.message);

		return res.json(data);
	});
}

/**
 * retrieve single product data
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {function} next express next function
 * @returns {Promise<void>}
 */
async function getProductController(req, res, next) {
	/** extract product id from the request params */
	const { id } = req.params;

	/** invoking gRPC client's 'listProducts' method to retrieve single product */
	productClient.getProduct({ id }, (err, data) => {
		if (err) return res.status(500).json(err.message);

		return res.json(data);
	});
}

/**
 * new product creation process
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {function} next express next function
 * @returns {Promise<void>}
 */
async function createProductController(req, res, next) {
	/** extract data from the request body */
	const { title, price } = req.body;

	/** invoking gRPC client's 'createProduct' method to create a product */
	productClient.createProduct({ title, price }, (err, data) => {
		if (err) return res.status(500).json(err.message);

		return res.json(data);
	});
}

/**
 * product update process
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {function} next express next function
 * @returns {Promise<void>}
 */
async function updateProductController(req, res, next) {
	/** extract data from the request body */
	const data = req.body;

	/** invoking gRPC client's 'updateProduct' method to update a product */
	productClient.updateProduct(data, (err, data) => {
		if (err) return res.status(500).json(err.message);

		return res.json(data);
	});
}

/**
 * product removal process
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {function} next express next function
 * @returns {Promise<void>}
 */
async function deleteProductController(req, res, next) {
	/** extract product id from the request params */
	const { id } = req.params;

	/** invoking gRPC client's 'deleteProduct' method to delete a product */
	productClient.deleteProduct({ id }, (err, data) => {
		if (err) return res.status(500).json(err.message);

		return res.json(data);
	});
}

module.exports = {
	listProductsController,
	getProductController,
	createProductController,
	updateProductController,
	deleteProductController,
};
