const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { sendVerificationEMail } = require("./utils/sendEMail");
const {
  errorMiddleware,
  default: ErrorHandler,
} = require("./middlewares/error");

dotenv.config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("server up and running");
});
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/adImage", require("./routes/adRoute"));
app.use("/api/v1/admin", require("./routes/adminRoute"));
// app.use("/api/v1/service-provider", require("./routes/emailVerificationRoute"));
app.use("/api/v1/service-provider", require("./routes/serviceProviderRoute"));

app.use("/test", require("./routes/socketRoute"));
app.get("/test-verify-mail", async (req, res) => {
  await sendVerificationEMail("Aashnaa", "A", "missaashnaa1@gmail.com", "12");
  res.send("check mail");
});
app.use("/api/v1/payment", require("./routes/paymentRoutes"));
app.use("/api/v1/comments", require("./routes/commentsRoutes"));
app.get("/test-error-handling", (req, res, next) => {
  next(new ErrorHandler("test error handling", 500));
});

// error handling

app.all("*", (req, res) => {
  res.status(404).json({ msg: "40404" });
});

app.use(errorMiddleware);

module.exports = { app };
