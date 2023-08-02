const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require('path');
const hbs = require("hbs");
const publicPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, '/views');


const PORT = process.env.PORT || 8000;

app.set("view engine", "hbs");
app.use(express.static(publicPath));
app.set('views', viewsPath );


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