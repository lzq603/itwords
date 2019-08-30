const app = getApp()
const AV = require('./libs/leancloud/av-weapp-min.js')
App({
  globalData: {
    appInfo: {
      "name": "IT用语词典",
      "version": "1.0 Developer Beta",
      "copyright": "© 2018 图南队"
    },
    userInfo: null,
    //host:'http://localhost:8080/'
    host:'https://www.tunan.work/itwords/'
  },
  getUserInfo: function(cb) {
    var that = this
    if(this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  onLaunch: function() {
    // 使用前将你的 LeanCloud App ID 与 App Key 替换此处配置
    //var config = require('config.js')
    // wx.downloadFile({
    //   url:'http://120.79.54.89/wendang.txt',
    //   filePath:'D:\\1.txt',
    //   success(res){
    //     console.log(res)
    //   }
    // })
    AV.init({
      appId: "wx8742a46add146dbd",
      appKey: "a5e527a6af7bfda61f6cd7591f148176"
    })
  },
  //显示错误提示
  showError: function (err) {
    wx.showToast({
      title: err,
      image: '/image/close.png'
    })
  }
})
