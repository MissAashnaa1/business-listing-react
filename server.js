const { app } = require("./app");
const { connectDB } = require("./config/db");

connectDB();

// server
const port = process.env.PORT || 4000;
const server = app.listen(port, (error) => {
  if (error) console.log(error);
  console.log("Server running on port " + port);
});

// Socket.io cors setup
const io = require("socket.io")(server, {
  pingTimout: 60000,
  cors: {
    origin: [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL2,
      process.env.FRONTEND_URL_HOSTED,
    ],
  },
});

// below line is to make "io" available in routes
app.set("io", io);

// socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected to WebSocket", socket.id);

  socket.on("setup", (data) => {
    console.log(data, "< data from frontend Received");
    setTimeout(() => {
      socket.emit("msg", { msg: "Hello from backend" });
    }, 3000); // 3 sec time out
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected from WebSocket");
  });

  socket.on("connect-admin", (data) => {
    console.log(data);
    setTimeout(() => {
      socket.emit("server-to-admin", "Hello from server to admin");
    }, 2000);
  });
});