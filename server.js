"use strict"

const express = require('express')
const app = express()
const pg = require('pg')
const server = require('http').Server(app);
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000
const POSTGRES_URL = process.env.POSTGRES_URL
  || 'postgres://anon:anon@localhost:5432/nodechat'

let db

app.set('view engine', 'jade')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('Socket Connected ==== ');

    db.query('SELECT * FROM chats LIMIT 100', (err, result) => {
    if (err) throw err

    socket.emit('initChats', result.rows)
  })

  socket.on('chat', (data) => {
    db.query(`INSERT INTO chats (name, text) VALUES ($1, $2)`, [data.name, data.text],
      (err) => {
        if (err) throw err
    io.sockets.emit('chat', data);

      })
  });

  socket.on('disconnect', () => {
    console.log('user disconnected => <=');
  });
});

app.get('/chats', (req, res) => {

})

pg.connect(POSTGRES_URL, (err, client) => {
  if (err) throw err

  db = client

  server.listen(PORT, () => console.log(`
   ___  ____  ____  _  _  ____  ____    __  __  ____
  / __)( ___)(  _ \\( \\/ )( ___)(  _ \\  (  )(  )(  _ \\
  \\__ \\ )__)  )   / \\  /  )__)  )   /   )(__)(  )___/
  (___/(____)(_)\\_)  \\/  (____)(_)\\_)  (______)(__)

  c(._.)b PORT ${PORT}  d(-__-)O `))

})

