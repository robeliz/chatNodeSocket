//Si colocamos localhost limitara las conexiones al equipo, con la IP se limita a la LAN
socket = io.connect('192.168.1.100:6677',{'forceNew':true});

socket.on('messages',function(data){
	render(data);
});

function render(data){
	var html = data.map(function(message, index){
		return(`
			<div class="message">
				<strong>${message.nickname}</strong>
				<p>${message.text}</p>
			</div>
		`);
		//Comillas ` permite escribir en varias lineas e interpolar variables con ${var} ES6
	}).join(' ');//Concatena un espacio entre elementos;
	
	document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
	
	var message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};
	
	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message',message);
	
	return false;
}
