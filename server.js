"use strict"

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

app.set('view engine', 'jade')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(PORT, () => console.log(`
 ___  ____  ____  _  _  ____  ____    __  __  ____
/ __)( ___)(  _ \\( \\/ )( ___)(  _ \\  (  )(  )(  _ \\
\\__ \\ )__)  )   / \\  /  )__)  )   /   )(__)(  )___/
(___/(____)(_)\\_)  \\/  (____)(_)\_)  (______)(__)

c(._.)b PORT ${PORT}  d(-__-)O `))