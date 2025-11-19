require("dotenv").config();

const express = require("express");
const path = require("path");
const { createServer } = require("node:http");
const socket = require("./utilities/socket");

const app = express();
const server = createServer(app);
socket.init(server);

const partiesRouter = require("./routers/parties.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", "views");

// Serve static files from the "assets" directory
app.use(express.static(path.join(__dirname, "assets")));

// Principal route
app.use("/", partiesRouter);

// tchat boardcast channel
socket.getIO().on("connection", (sock) => {
  sock.on("broadcastMessage", (message) => {
    console.log(message);
    
    socket.getIO().emit("newMessage", message);
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`SERVER IS LISTENING ON PORT ${process.env.PORT} !`);
});
