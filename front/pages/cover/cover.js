// pages/cover/cover.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //app.login()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  doLogin: function(e){
    let user = e.detail.userInfo      //原始用户信息
    if (e.detail.errMsg == "getUserInfo:fail auth deny"){
      app.showError("请点击允许")
    } else if (e.detail.errMsg == "getUserInfo:ok"){
      wx.login({
        success(res){
          console.log(res)
          //获取临时凭证
          var code = res.code
          //调用后端，获取微信的session_key,secret
          wx.request({
            url: app.globalData.host + 'wxLogin?code=' + code,
            method: 'post',
            success(result){
              //用户其它信息
              console.log(result)
              user.id = result.data.uid
              user.name = result.data.uname
              console.log(user)       //最终user
              app.globalData.userInfo = user
              wx.setStorage({
                key: 'user',
                data: user
              })
              if(result.data.uid){     //登录成功后跳转
                wx.switchTab({
                  url: '/pages/home/home'
                })
              }else{
                app.showError("登录失败")
              }
            },
            fail(result){
              app.showError("登录失败")
            }
          })
        },
        fail(res){
          app.showError("登录失败")
        }
      })
    }
  }
})