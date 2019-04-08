const socket = io();

socket.on('chatToClient', function(chat, callback){
  const message = $('<li>');  
  message.text(chat);
  $('.currentChat').append(message);
  callback();
  
});