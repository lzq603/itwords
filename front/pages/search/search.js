const app = getApp()
const AV = require('../../libs/leancloud/av-weapp-min.js')
var WxSearch = require('../../libs/wxSearch/wxSearch.js')

Page({
  data: {
    entries: []
  },
  // 跳转详情页
  touchEntry: function(event) {
    var entryId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../entry/entry?entryId=' + entryId
    })
  },
  // 监听页面加载
  onLoad: function() {
    var that = this
    // wxSearch 热门搜索
    WxSearch.init(that, 64, [
      '物联网',
      '自动驾驶',
      '车联网'
    ])
    // wxSearch 自动补全
    // WxSearch.initMindKeys([
    //   '网络',
    //   '用语',
    //   '香菇',
    //   '网格'
    // ])
    console.log('Search Page: onLoad.')
  },
  // 监听页面初次渲染完成
  onReady: function() {
    console.log('Search Page: onReady.')
  },
  // 监听页面显示
  onShow: function() {
    console.log('Search Page: onShow.')
  },
  // 监听页面隐藏
  onHide: function() {
    console.log('Search Page: onHide.')
  },
  // 监听页面卸载
  onUnload: function() {
    console.log('Search Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh: function() {
    console.info('Search Page: onPullDownRefresh.')
  },
  // wxSearch 功能
  wxSearchFn: function(e) {
    // let kid = this.data.wxSearchData.mindKeys[0].id
    // wx.navigateTo({
    //   url: '/pages/entry/entry?entryId=' + kid
    // })
     if (this.data.wxSearchData.mindKeys[0] == 'undefined' || this.data.wxSearchData.mindKeys[0] == null){
      wx.navigateTo({
        url: '/pages/error/error'
      })
    }else{
      console.log('这里是length:'+this.data.wxSearchData.mindKeys[0].id)
      let kid = this.data.wxSearchData.mindKeys[0].id
      wx.navigateTo({
        url: '/pages/entry/entry?entryId=' + kid
      })
    }

  },
  wxSearchInput: function(e) {
    let that = this
    let key = e.detail.value
    console.log(key)
    if(key == null || key == ''){
      console.log("空")
      that.setData({ 'wxSearchData.mindKeys':[]})
      return;
    }
    wx.request({
      url: app.globalData.host + '/mindWords?key=' + key,
      success(res){
        console.log(res.data)
        that.setData({'wxSearchData.mindKeys':res.data})
      },
      fail(res){
        console.log(res)
        app.showError("错误")
      }
    })
    // WxSearch.initMindKeys([
    //   '信息','信封','信念','信件'
    // ])
    // WxSearch.wxSearchInput(e, that)
  },
  wxSearchFocus: function(e) {
    var that = this
    WxSearch.wxSearchFocus(e, that)
  },
  wxSearchBlur: function(e) {
    var that = this
    WxSearch.wxSearchBlur(e, that)
  },
  wxSearchKeyTap: function(e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that)
  },
  wxSearchDeleteKey: function(e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that)
  },
  wxSearchDeleteAll: function(e) {
    var that = this
    WxSearch.wxSearchDeleteAll(that)
  },
  wxSearchTap: function(e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that)
  }
})
