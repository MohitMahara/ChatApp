const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require('path');

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "public") ));


app.get('/', (req, res) => {
    res.render("index");
})


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

})


// Socket

const io = require("socket.io")(http)

io.on("connection", (socket) => {

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
     })

})