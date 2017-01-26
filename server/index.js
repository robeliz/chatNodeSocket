var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Usamos el middleware de express para decirle donde va a estar nuestro contenido estático
app.use(express.static('client'));

app.get("/",function(req, res){
	res.send('index');
});

var messages = [{
		id: 1,
		text: 'Bienvenido al chat privado de Socket.io y NodeJS',
		nickname: 'Bot'
}];

//Abrir conexion al socket
io.on("connection", function(socket){
	//Este método debe estar pendiente de que alguien se conecte al socket
	console.log("El nodo con IP: "+socket.handshake.address+" se ha conectado...");
	
	socket.emit('messages',messages);//Broadcast a todos
	
	socket.on('add-message', function(data){
		console.log(data);
		messages.push(data);
		io.sockets.emit('messages',messages);
	});
	
	console.log(messages);
	
	io.sockets.emit('messages',messages);
});

server.listen(6677, function(){
	console.log("Servidor iniciado en el puerto 6677");
});