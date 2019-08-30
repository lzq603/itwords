const app = getApp()
const AV = require('../../libs/leancloud/av-weapp-min.js')

Page({
  data: {
    title: app.globalData.appInfo.name,
    version: app.globalData.appInfo.version,
    copyright: app.globalData.appInfo.copyright,
    meta: {
      origin: "QQ群：88888888",
      //opensource: "github.com/ispacekid/wxa-internet-slangs"
    }
  },
  // 监听页面加载
  onLoad: function() {
    console.log('About Page: onLoad.')
  },
  // 监听页面初次渲染完成
  onReady: function() {
    console.log('About Page: onReady.')
  },
  // 监听页面显示
  onShow: function() {
    console.log('About Page: onShow.')
  },
  // 监听页面隐藏
  onHide: function() {
    console.log('About Page: onHide.')
  },
  // 监听页面卸载
  onUnload: function() {
    console.log('About Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh: function() {
    console.info('About Page: onPullDownRefresh.')
  }
})
