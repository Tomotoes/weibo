const getIssue = require('./issue')
const telegram = require('./platform/telegram')
const gist = require('./platform/gist')
const twitter = require('./platform/twitter')

const sync = () => {
  getIssue().then(issue => {
    telegram(issue)
    gist(issue)
  }).then(() => {
    console.log('全部平台同步完成!')
  }).catch(err => {
    console.error('平台同步过程中,出现错误!')
    console.error(err)
  })
}

sync()