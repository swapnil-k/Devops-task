var express = require('express');
var app = express();
var http = require('http').createServer(app);
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

var io = require('socket.io')(http, {
  cors: {
    origin: "https://naya-web-nznegpbkqa-el.a.run.app",
    methods: ["GET", "POST"]
  }
})
dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "50MB"}));

mongoose.connect(process.env.MONGO_URI,   { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
    console.log('DB Connected')
})


mongoose.connection.on('error' , err => {
  console.log(`DB Connection Error: ${err.message}`);
} )

io.on('connection', (socket)=> {
  console.log('User Online');

  socket.on('canvas-data', (data)=> {
        socket.broadcast.emit('canvas-data', data);
        
  })
})


http.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

// server.listen(app.get('port'))
const profileRoutes = require('./routes/profile');
const sketchRoutes = require('./routes/sketch');
app.use("/api", profileRoutes);
app.use("/api", sketchRoutes);

