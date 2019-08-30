// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mindKeys:[]
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
  /**
  * 下载文件并预览
  */
  previewFile: function (event) {
    var that = this;
    var url = event.currentTarget.dataset.url;
    if (url === undefined || url === null || url.length <= 0) {
      wx.showToast({
        title: 'URL为空',
      })
      return;
    }

    var index1 = url.lastIndexOf(".");
    var suffixName = url.substring(index1 + 1, url.length);//后缀名 
    if (suffixName === undefined || suffixName === null || suffixName.length <= 0) {
      wx.showToast({
        title: '无法从URL中解析出后缀名',
      })
      return;
    }
    suffixName = suffixName.toLowerCase();

    var imageSuffixArr = ["bmp", 'jpg', 'jpeg', 'png', 'gif'];
    for (var i = 0; i < imageSuffixArr.length; i++) {
      if (suffixName == imageSuffixArr[i]) {
        wx.previewImage({
          urls: [url],
        })
        return;
      }
    }

    var supportSufixArr = ['doc', 'xls', 'ppt', 'pdf', 'docx', 'xlsx', 'pptx'];
    var isSupport = false;
    for (var i = 0; i < supportSufixArr.length; i++) {
      if (suffixName == supportSufixArr[i]) {
        isSupport = true;
        break;
      }
    }
    if (!isSupport) {
      wx.showToast({
        title: '不支持' + suffixName,
      })
      return;
    }
    wx.showLoading({
      title: '加载中..',
    })
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath;
        console.log(filePath);
        wx.openDocument({
          filePath: filePath,
          success: function () {
            console.log("打开文档成功:" + url);
            wx.hideLoading();
          },
          fail: function (r) {
            console.log(r);
            wx.hideLoading();
            wx.showToast({
              title: '打开失败',
              duration: 2000
            })
          },
          complete: function (r) {
            console.log(r);
            wx.hideLoading();
          }
        })
      },
      fail: function (r) {
        console.log("下载失败:" + url + "." + r);
        wx.hideLoading();
        wx.showToast({
          title: '下载失败',
          duration: 2000
        })
      }
    })
  }
})