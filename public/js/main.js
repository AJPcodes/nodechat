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

  zap.on('chat', (data) => {
      console.log(data)
      displayChat(data);
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('hello', name.value, text.value)
    let data = {
      text: text.value,
      name: name.value
    }

    displayChat(data);
    zap.emit('chat', data, (result) => {
      console.log(result);
    })

  })

})()