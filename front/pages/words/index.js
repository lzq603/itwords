const app = getApp()
const AV = require('../../libs/leancloud/av-weapp-min.js')

Page({
  data: {
    entries: [],
    index:0
  },
  // 跳转详情页
  touchEntry: function(event) {
    var entryId = event.currentTarget.dataset.id
    console.log(entryId)
    wx.navigateTo({
      url: '../entry/entry?entryId=' + entryId
    })
  },
  // 监听页面加载
  onLoad: function(options) {
    console.log(options)
    // 获取用户信息
    var that = this
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    // 获取词条数据
    var query = new AV.Query('entry')
    query
      .ascending('meta.collectionDate')
      .find()
      .then(entries => this.setData({
        entries
      }))
      .catch(console.error)

    this.loadWords(7,options.category)

    console.log('Index Page: onLoad.')
  },
  // 监听页面初次渲染完成
  onReady: function() {
    console.log('Index Page: onReady.')
  },
  // 监听页面显示
  onShow: function() {
    console.log('Index Page: onShow.')
  },
  // 监听页面隐藏
  onHide: function() {
    console.log('Index Page: onHide.')
  },
  // 监听页面卸载
  onUnload: function() {
    console.log('Index Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh: function() {
    console.log('Index Page: onPullDownRefresh.')
  },
  onReachBottom:function(){
    this.loadWords(7)
  },
  
  loadWords:function(num,category){
    let that = this
    let url = ''
    if(category)
      url = app.globalData.host + 'getWordsByCategory?category=' + category
    else
      url = app.globalData.host + 'getWords'
    console.log(url)
    wx.request({
      url: url,
      data: {
        start: that.data.index,
        num: num
      },
      success(res) {
        console.log(res)
        var words = that.data.entries
        for(var i = 0;i < res.data.length;i++){
          words.push(res.data[i])
        }
        that.setData({ entries: words })
        that.setData({ index: that.data.index + res.data.length })
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})