const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const NodeCache = require("node-cache");
const nodeCache = new NodeCache({ stdTTL: 100 });
const {
  errorMiddleware,
  default: ErrorHandler,
} = require("./middlewares/error");

// env variables
dotenv.config();

// middlewares
app.set("view engine", "ejs");
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5174",
      "https://adv-biz.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server up and running");
});
// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/adImage", require("./routes/adRoute"));
app.use("/api/v1/admin", require("./routes/adminRoute"));
app.use("/api/v1/service-provider", require("./routes/serviceProviderRoute"));
app.use("/api/v1/payment", require("./routes/paymentRoutes"));
app.use("/api/v1/comments", require("./routes/commentsRoutes"));

// 404 error handling
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server`, 404));
});

// error handling
app.use(errorMiddleware);

module.exports = { app, nodeCache };
