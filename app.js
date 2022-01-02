require("dotenv").config();
require("express-async-errors");

//extra Security Packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimitter = require("express-rate-limit");

//Swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

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
app.set("trust proxy", 1);
app.use(
  rateLimitter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send(`<h1>House Search API</h1><a href = "/api-docs">Documentation</a>`);
});

app.use(`/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
