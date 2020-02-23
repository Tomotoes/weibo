const { GistBox } = require('gist-box')

const gistID = '2387925d8c60bb011d92cc82ebcdc357'
const { GIST_TOKEN } = process.env

const box = new GistBox({ gistID, GIST_TOKEN })

module.exports = issue => {
  return box.update({
    filename: 'Weibo.sync',
    description: '✨ Latest Weibo',
    content: issue
  })
}