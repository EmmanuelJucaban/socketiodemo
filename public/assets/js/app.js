$('.chatBtn').on('submit', (e) => {
  e.preventDefault();
  const chat = $('.chat').val();
  // console.log(chat);
  socket.emit("sendChatToServer", chat);
  $('.chat').val('');
})