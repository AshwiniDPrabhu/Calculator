import io from 'socket.io-client';

const  socket = io();

socket.on('connect', function(){
  console.log("socket connected");
  socket.on('disconnect', () => {
    console.log('socket disconnected');
  });
});

function sendMessage(topic, message) {
  socket.emit(topic, message);
}

function subscribeToMessages(topic, cb) {
  socket.on(topic, data => cb(null, data));
}

function unsubscribeFromMessages(topic, cb) {
  socket.off(topic, data => cb(null, data));
}

export { sendMessage, subscribeToMessages, unsubscribeFromMessages };