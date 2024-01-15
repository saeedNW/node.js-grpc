/** import product model */
const { productModel } = require("../model/product.model");

/**
 * RPC function to list products.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
async function listProductsFunction(call, callback) {
	try {
		/** retrieve products list from the database */
		const products = await productModel.find({});
		/** send the list of products as a response back to the client */
		callback(null, { products });
	} catch (err) {
		callback(err, null);
	}
}

/**
 * RPC function to retrieve single product with id.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
async function getProductFunction(call, callback) {
	try {
		/** extract product id from client's request */
		const { id } = call.request;

		/** retrieve product data from database */
		const product = await productModel.findOne(
			{ id },
			{ title: 1, price: 1, id: 1 }
		);

		/** return error if product was not found */
		if (!product) return callback(new Error("product was not found"), null);

		/** return successful response */
		return callback(null, product);
	} catch (err) {
		callback(err, null);
	}
}

/**
 * RPC function to create a new product.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
async function createProductFunction(call, callback) {
	try {
		/** extract title and price from client's request */
		const { title, price } = call.request;

		/** add new product in database */
		const newProduct = await productModel.create({ title, price });
		/** return error if the creation was unsuccessful */
		if (!newProduct) return callback(new Error("creation error"), null);
		/** return successful creation response */
		return callback(null, { status: "created" });
	} catch (err) {
		callback(err, null);
	}
}

/**
 * RPC function to update a product.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
async function updateProductFunction(call, callback) {
	try {
		/** extract product id from client's request */
		const { id } = call.request;
		/** extract data from client's request */
		const data = call.request;
		/** remove product id from data */
		delete data.id;
		/** update product data in database */
		const updateResult = await productModel.updateOne({ id }, { $set: data });
		/** return error if the process failed */
		if (updateResult.modifiedCount <= 0)
			return callback(new Error("update error"), null);
		/** return successful response */
		return callback(null, { status: "updated" });
	} catch (err) {
		callback(err, null);
	}
}

/**
 * RPC function to delete a product.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
async function deleteProductFunction(call, callback) {
	try {
		/** extract product id from client's request */
		const { id } = call.request;
		/** remove product data from database */
		const deleteResult = await productModel.deleteOne({ id });
		/** return error if the process failed */
		if (deleteResult.deletedCount <= 0)
			return callback(new Error("delete error"), null);
		/** return successful response */
		return callback(null, { status: "removed" });
	} catch (err) {
		callback(err, null);
	}
}

module.exports = {
	listProductsFunction,
	getProductFunction,
	createProductFunction,
	updateProductFunction,
	deleteProductFunction,
};
