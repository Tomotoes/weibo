const Slimbot = require('slimbot')
const isImageUrl = require('is-image-url')

const { BOT_TOKEN } = process.env
const slimbot = new Slimbot(BOT_TOKEN)

const chatID = -1001249449971

const config = {
  parse_mode: "Markdown",
  disable_web_page_preview: false,
  disable_notification: false,
}

const imageRegex = /(?:!\[(.*?)\]\((.*?)\))/g

module.exports = body => {
  return slimbot.sendMessage(chatID, body, config)
    .then(() => {
      console.log('telegram 频道同步成功!')
      const images = body.match(imageRegex)
      if (!images || !images.length) {
        console.log('未检测到图片!')
        return
      }
      images.map(image => image.slice(image.indexOf('(') + 1, -1))
        .filter(isImageUrl)
        .forEach(url => {
          slimbot.sendPhoto(chatID, url)
            .then(() => {
              console.log(url + '图片发送成功!')
            }).catch(err => {
              console.error(url + '图片发送失败!')
              console.error(err)
            })

        })
    }).catch(err => {
      console.error('telegram 频道同步失败!')
      console.error(err)
    })
}
