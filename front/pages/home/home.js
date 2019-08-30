// pages/home/home.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var date = new Date()
  },
  sign: function () {
    wx.navigateTo({
      url: '/pages/sign-in/sign-in',
    })
  },
  createActivity: function () {
    wx.navigateTo({
      url: '/pages/createActivity/createActivity'
    })
  },
  getWords:function(e){
    var data = e.currentTarget.dataset
    wx.switchTab({
      url: '/pages/index/index?category=' + data.category
    })
  }
})
