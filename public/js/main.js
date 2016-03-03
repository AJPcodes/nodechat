;(function(){
  'use strict'

  const zap = io.connect()

  zap.on('connect', () => {
        console.log(`
       ___                            _           _
      / __\\___  _ __  _ __   ___  ___| |_ ___  __| |
     / /  / _ \\| \'_ \\| \'_ \\ / _ \\/ __| __/ _ \\/ _\` |
    / /__| (_) | | | | | | |  __/ (__| ||  __/ (_| |
    \\____/\\___/|_| |_|_| |_|\\___|\\___|\\__\\___|\\__,_|

    `)
  })

  zap.on('chat', (data) => {
      displayChat(data);
  })

  zap.on('initChats', (data) => {
    data.forEach(chat => displayChat(chat))
  })

  const form = document.querySelector('form')
  const name = form.querySelector('input[name="name"]')
  const text = form.querySelector('input[name="text"]')
  const ul = document.querySelector('ul')

  const displayChat = (chatData) => {

    const li = document.createElement('li')
    const textNode = document.createTextNode(`${chatData.name}: ${chatData.text}`)
    li.appendChild(textNode);
    ul.appendChild(li);

  };


  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = {
      text: text.value,
      name: name.value
    }
    zap.emit('chat', data, (result) => {
    })

    text.value = "";
  })


})()
