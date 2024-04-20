const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on("connection",(socket)=>{
  socket.on("user-message",(message)=>{
    io.emit("message",message)
  })
})

// Serve static files from the 'public' directory
app.use(express.static(path.resolve("./public/loginregister.html")))

// Route for serving the login/register page
app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/loginregister.html"))
});

app.get("/login", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
});
  
// Handle POST request to root path
app.post("/", (req, res) => {
    res.redirect("/login")
});

// Start the server
server.listen(3000, () => 
console.log("Server started at PORT: 3000"))
