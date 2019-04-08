const http      = require('http');
const express   = require('express');
const socketio  = require('socket.io');
const exphbs    = require("express-handlebars");

const app       = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// socket io requires the barebones version of an http server
// express cannot do that for us so we use the http module
const server = http.createServer(app);



// Create our connection with our server and socketio
const io = socketio(server);

// Statically host our front end files
app.use(express.static("public"));

// Activates body parser so we can get req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let count = 0;

io.on('connect', (socket) => {
	count++;
	const name = "manny"
	
	socket.on('sendChatToServer', (chat) => {
		// Sends event to everyone but the sender
		// socket.broadcast.emit('chatToClient', chat);

		// Emit only to the sender
		socket.emit('chatToClient', chat, name , () => {
			console.log("Server received");
		});

		// Emits to everyone connected 
		// io.emit('chatToClient', chat);
	});

	
	
})

app.get('/', (req, res) => {
	res.render('index', {count});
})

// use our server to listen to a port
server.listen(3000, () => {
	console.log("Connected");
})

