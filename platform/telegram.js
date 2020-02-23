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

module.exports = issue => {
  return slimbot.sendMessage(chatID, issue, config)
    .then(() => {
      const images = issue.match(imageRegex)
      if (!images || !images.length) {
        return
      }
      images.map(image => image.slice(image.indexOf('(') + 1, -1))
        .filter(isImageUrl)
        .forEach(url => {
          slimbot.sendPhoto(chatID, url)
        })
    })
}
