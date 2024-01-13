/** import grpc module */
const grpc = require("grpc");
/** import grpc proto loader module */
const protoLoader = require("@grpc/proto-loader");
/** import (load) proto file */
const echoProto = protoLoader.loadSync("./echo.proto", {});
/** compile proto code to javascript */
const echoDefinition = grpc.loadPackageDefinition(echoProto);
/** extract echo package from compiled proto */
const { echoPackage } = echoDefinition;
/** import application config file */
const { SERVER_URL } = require("./config");

/** initialize client services */
const client = new echoPackage.EchoService(
	SERVER_URL,
	grpc.credentials.createInsecure()
);

/**
 * ? START: Unary => Normal request and response.
 */

/** Create an EchoMessage object with the value property */
const echoData = { value: "Unary request value" };

/** Echo Unary */
client.EchoUnary(echoData, (err, response) => {
	/** print error into console */
	if (err) return console.error("Error:", err.message);

	/** print response into console */
	console.log("============================");
	console.log("Received unary response:", response);
	console.log("============================");
});

/**
 * ? START: Server Stream => send classic request
 * ? and receive data stream as response.
 */

/** Echo Server Stream */
const serverStream = client.EchoServerStream();

/** Set a timeout to start listening for server responses after a delay */
setTimeout(() => {
	/** Event listener for receiving data from the server stream */
	serverStream.on("data", (data) => {
		console.log("Received data from server stream:", data);
	});
}, 500);

/** Event listener for the end of the server stream */
serverStream.on("end", (error) => {
	console.error("Server stream ended. Error:", error);
});

/**
 * ? START: Client Streaming => send request as
 * ? data stream and receive classic response.
 */

/** Sample array of EchoMessage objects */
const echos = [
	{ value: "value1" },
	{ value: "value2" },
	{ value: "value3" },
	{ value: "value4" },
];

/**
 * Client streaming RPC to send a sequence of messages to the server.
 * @param {null} [metadata] - Optional metadata (null in this example).
 * @param {function} [callback] - Callback function to handle the server's response.
 */
const clientStream = client.EchoClientStream(null, (err, response) => {
	console.log("Client stream server response:", response);
});

/** Index to keep track of the current position in the 'echos' array */
let index = 0;

/**
 * Interval function to periodically send messages to the server.
 */
setInterval(function () {
	/** Writing the current message to the client stream */
	clientStream.write(echos[index]);

	/** Incrementing the index for the next message */
	index++;

	/** Check if all messages have been sent */
	if (index === echos.length) {
		/** End the client stream if all messages have been sent */
		clientStream.end();

		/** Clear the interval to stop sending messages */
		clearInterval(this);
		console.log("============================");
	}
}, 300);

/**
 * ? START: Bidi Streaming => send and receive
 * ? data stream as request and response
 */

/**
 * Bidirectional streaming RPC for exchanging date and time information with the server.
 * @type {Writable}
 */
const bidiStream = client.BidiStream();

/**
 * Interval function to periodically send current date and time to the server.
 */
setInterval(() => {
	// Writing the current date and time to the server stream
	bidiStream.write({ value: new Date().toLocaleString() });
}, 1000);

/**
 * Event listener for receiving data from the server stream.
 */
bidiStream.on("data", (data) => {
	// Log the received date and time from the server
	console.log("Received server DateTime:", data);
});
