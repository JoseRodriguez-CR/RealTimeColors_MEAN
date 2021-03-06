//Imports
const express = require("express");
const app = express();
const server = app.listen(1337);
const io = require("socket.io")(server);
console.log("server running on port 1337");
let color = "";

//Config
app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Sockets
io.on("connection", function(socket){
    console.log("Connected!");
    socket.emit("launch", {
        bgc : color
    });
    socket.broadcast.emit("launch", {
        bgc : color
    });

    socket.on("green_push", function(){
        socket.emit("green_bg");
        socket.broadcast.emit("green_bg");
        color = "green"
    });
    socket.on("blue_push", function(){
        socket.emit("blue_bg");
        socket.broadcast.emit("blue_bg");
        color = "blue"
    });
    socket.on("pink_push", function(){
        socket.emit("pink_bg");
        socket.broadcast.emit("pink_bg");
        color = "pink"
    });
});

//Routes
app.get("/", function(req, res){
	console.log("server running on port 1337");
    res.render("index");
});