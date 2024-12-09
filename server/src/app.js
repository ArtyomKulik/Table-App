const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const operationsRouter = require("./routers/operationsRouter");
const authRouter = require("./routers/authRouter");
const tokensRouter = require("./routers/tokensRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/operations", operationsRouter);
app.use("/api/auth", authRouter);
app.use("/api/tokens", tokensRouter);

module.exports = app;
