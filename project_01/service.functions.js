/**
 * Unary RPC function that echoes the received message.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
function echoUnaryFunction(call, callback) {
	console.log("Received unary request:", call.request);
	console.log("============================");

	/** Send a response back to the client */
	callback(null, {
		value: "Unary request has been received successfully.",
	});
}

/**
 * Server streaming RPC function that sends a sequence of messages to the client.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
function echoServerStreamFunction(call, callback) {
	console.log("============================");
	console.log("Received server stream empty request.");
	console.log("============================");

	/** Send a sequence of messages to the client (10 messages in this example) */
	for (let index = 0; index < 10; index++) {
		/** Writing a message to the client stream */
		call.write({
			value: index,
		});
	}

	/** Event listener for the end of the client stream */
	call.on("end", (err) => {
		if (err) return console.error("Server stream ended. Error:", err);
	});
}

/**
 * Server streaming RPC function that receives a sequence of messages from the client.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
function echoClientStreamFunction(call, callback) {
	/** Array to store received messages from the client */
	const list = [];

	/** Event listener for receiving data from the client stream */
	call.on("data", (data) => {
		/** Push the received data to the list */
		list.push(data);
		console.log("Received data from client stream:", data);
	});

	/** Event listener for the end of the client stream */
	call.on("end", (err) => {
		/** Log the accumulated list of received messages */
		console.log("Received messages from client stream:", list);
		console.log("============================");

		/** Log any potential error at the end of the client stream */
		if (err) return console.error("Client stream ended. Error:", err);
	});
}

/**
 * Bidirectional streaming RPC function that communicates with the client in both directions.
 * @param {Object} call - gRPC call object representing the client request.
 * @param {function} callback - Callback function to send the response back to the client.
 */
function bidiStreamFunction(call, callback) {
	/** Event listener for receiving data from the client stream */
	call.on("data", (data) => {
		/** Log the received data from the client */
		console.log("Received data from client:", data);

		/** Send a response back to the client with the current server date and time */
		call.write({ value: new Date().toLocaleString() });
	});

	/** Event listener for the end of the client stream */
	call.on("end", (err) => {
		/** Log any potential error at the end of the client stream */
		if (err) return console.log("Client stream ended. Error:", err);
	});
}

module.exports = {
	echoUnaryFunction,
	echoClientStreamFunction,
	echoServerStreamFunction,
	bidiStreamFunction,
};
