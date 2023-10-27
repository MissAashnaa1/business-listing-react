const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

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

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/ad", require("./routes/adRoute"));

app.use("/api/admin", require("./routes/adminRoute"));
app.use("/test", require("./routes/socketRoute"));

app.all("*", (req, res) => {
  res.status(404).json({ msg: "40404" });
});

module.exports = { app };
