/** import mongoose module */
const { default: mongoose, model } = require("mongoose");

/**
 * define mongoose model schema for products
 */
const productSchema = new mongoose.Schema({
	id: {
		// product manual id which is
		// going to be auto increment
		type: Number,
	},
	title: {
		type: String,
	},
	price: {
		type: String,
	},
});

/** define a pre save function for product schema */
productSchema.pre("save", autoIncrement);

/**
 * product's id, auto increment management
 * @param {*} next express next function
 */
async function autoIncrement(next) {
	/** Using 'countDocuments' to get the current count of documents */
	const data = await this.constructor.countDocuments();

	/** Set the 'id' field of the model to the next incremented value */
	this.set({ id: data + 1 });

	/** Continue to the next middleware or operation */
	next();
}

module.exports = {
	productModel: mongoose.model("product", productSchema),
};
