/** deactivate node.js deprecation warning */
process.noDeprecation = true;
/** import and stablish database connection */
require("./config/database.config");
/** import grpc module */
const grpc = require("@grpc/grpc-js");
/** import proto loader module */
const protoLoader = require("@grpc/proto-loader");
/** load product proto file */
const productProto = protoLoader.loadSync("../../proto/products.proto");
/** load product package from product proto */
const { productPackage } = grpc.loadPackageDefinition(productProto);
/** import product grpc functions */
const {
	listProductsFunction,
	getProductFunction,
	createProductFunction,
	updateProductFunction,
	deleteProductFunction,
} = require("./functions/products.grpc");

/** define product service URL */
const productServiceURL = "localhost:3001";

function main() {
	/** create grpc server instance */
	const server = new grpc.Server();

	/** add grpc services to server */
	server.addService(productPackage.ProductService.service, {
		listProducts: listProductsFunction,
		getProduct: getProductFunction,
		createProduct: createProductFunction,
		updateProduct: updateProductFunction,
		deleteProduct: deleteProductFunction,
	});

	/** bind service server to service's URL */
	server.bindAsync(
		productServiceURL,
		grpc.ServerCredentials.createInsecure(),
		(err, port) => {
			/** print error message to console */
			if (err) return console.error(err.message);

			console.log(`product service is running on http://localhost:${port}`);

			/** start product service server */
			server.start();
		}
	);
}

main();
