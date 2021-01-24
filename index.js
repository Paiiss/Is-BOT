const { create, Client } = require('@open-wa/wa-automate')
const options = require('./tools/options')
const figlet = require('figlet')
const color = require('./tools/color')
const Ais = require('./pais.js')
const lolcatjs = require('lolcatjs')

const start = (pais = new Client()) => {
    console.log(color(figlet.textSync('Is BOT', 'Dancing Font'), 'blue'))
    console.log(color(figlet.textSync('--------', { horizontalLayout: 'blue' })))
    console.log(color('[DEV]'), color('Pais', 'yellow'))
    console.log(color('[~>>]'), color('BOT Started!', 'green'))

    pais.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') pais.forceRefocus()
    })

    
    pais.onMessage(async (message) => {
        pais.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 3000) {
                    console.log('[pais]', color(`Total chats ${msg}, Hapus dulu nntk ngeleg2 kalo ga di hapus...`, 'red'))
                    pais.cutMsgCache()
                }
            })
    Ais(pais, message)   
    
    })
    
    pais.onAnyMessage((anal) => { 
        messageLog(anal.fromMe, anal.type)
    })
    
}

//ngebuat session
create(options(true, start))
    .then((pais) => start(pais))
    .catch((err) => new Error(err))