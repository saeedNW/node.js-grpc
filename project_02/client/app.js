/** import express */
const express = require("express");
/** create an app instance from express */
const app = express();

/** initialize express json body parser */
app.use(express.json());
/** initialize express urlencoded body parser */
app.use(express.urlencoded({ extended: true }));

/** import and initialize routers */
const { mainRouter } = require("./routers/router");
app.use(mainRouter);

/** start application */
app.listen(3000, () => {
	console.log("application running on http://localhost:3000");
});
