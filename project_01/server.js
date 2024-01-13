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
const { SERVER_URL } = require('./config');

/** import grpc services functions */
const {
	echoUnaryFunction,
	echoServerStreamFunction,
	echoClientStreamFunction,
	bidiStreamFunction,
} = require("./service.functions");

/** initialize grpc server */
const server = new grpc.Server();
/** initialize server services */
server.addService(echoPackage.EchoService.service, {
	EchoUnary: echoUnaryFunction,
	EchoServerStream: echoServerStreamFunction,
	EchoClientStream: echoClientStreamFunction,
	BidiStream: bidiStreamFunction,
});

/** bind server with URL and services */
server.bind(SERVER_URL, grpc.ServerCredentials.createInsecure());

console.log(`server running on http://${SERVER_URL}`);
/** start server */
server.start();
