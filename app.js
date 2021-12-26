const express = require("express");
const app = express();

const houseRouter = require("./routes/houses");

const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(express.json());

app.use("/api/v1/houses", houseRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
