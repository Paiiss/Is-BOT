require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
const fs = require('fs-extra')

let setting = JSON.parse(fs.readFileSync('./settings/setting.json'))

let {
    prefix
} = setting

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = msgHandler = async (pais, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''
    
        const time = moment(t * 1000).format(`HH:mm:ss`)
        const bulan = moment(t * 1000).format(`MM`)
        const tgal = moment(t * 1000).format(`DD`)
		const tm = moment(t * 1000).add(30, 'days').calendar()
        const botNumber = await pais.getHostNumber()
        const blockNumber = await pais.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await pais.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false

        
        
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        //const argz = body.trim().split(/ +/).slice(1)
        //const ispengirim = sender.id;
        
        
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        //const tms = (Date.now() / 1000) - (timeStart);
        //const cts = waktu(tms)
        const isCmd = command.startsWith(prefix)
        const serial = sender.id
        const ownerNumber = '6285805609094@c.us'
        const isOwner = ownerNumber.includes(sender.id)

        if (args.includes('@6287771818443')) { //replace with your bot number
            pais.reply(from, 'Iya ada apa?', id)
        }

        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;32mOUT\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>>', '[\x1b[1;32mOUT\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>>', '[\x1b[1;34mMSG\x1b[1;37m]', time, color(`pesan = ${command}`), 'from', color(pushname))
        if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>>', '[\x1b[1;34mMSG\x1b[1;37m]', time, color(`pesan = ${command}`), 'from', color(pushname), 'in', color(formattedTitle))

        switch (command) {
            case prefix + 'menu':
                pais.reply(from, `ANJAY BISA`, id)
                break
        }

    }catch (err) {
        console.error(color(err, 'red'))
    }
}