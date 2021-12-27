require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connect to Database
const ConnectDB = require("./db/connectDB");
const authenticateUser = require("./middleware/authentication");

const houseRouter = require("./routes/houses");
const authRouter = require("./routes/auth");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/houses", authenticateUser, houseRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
