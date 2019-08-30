// pages/wordcloud/wordcloud.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:1,
	words:["小黄车", "核心竞争力", "医疗保健", "教育信息化", "物联网", "Notebook", "燃气报警", "云计算", "比特币", "技术成熟度曲线", "物联网", "FFCN", "广州南沙", "车联网", "智能网联汽车", "自动驾驶", "专利", "车联网", "智能网联汽车", "小鹏汽车", "大客户营销体验中心", "车联网", "智能网联汽车", "VR游戏", "VR店", "VR头显", "VR店", "2019年", "VR头显", "死或生沙滩排球", "FCC认证", "头号玩家", "A轮融资"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.innit()
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
  },
  innit: function () {
	let that = this;
    var tagEle = [
      {
        title: that.data.words[0],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[1],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[2],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[3],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[4],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[5],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[6],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[7],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[8],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[9],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[10],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[11],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[12],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[13],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[14],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[15],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[16],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[17],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[18],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      },
      {
        title: that.data.words[19],
        x: 0,
        y: 0,
        z: 0,
        s: 0,
        o: 1,
        f: 15,
        angleX: 0,
        angleY: 0
      }
    ]
    for (var i = 0; i < tagEle.length; i++) {
      var fallLength = 100 //圆的焦点
      var angleX = Math.PI / 100
      var angleY = Math.PI / 100
      var k = (2 * (i + 1) - 1) / tagEle.length - 1;
      //计算按圆形旋转
      var a = Math.acos(k);
      var b = a * Math.sqrt(tagEle.length * Math.PI);
      //计算元素x，y坐标
      var numx = 120 * Math.sin(a) * Math.cos(b)
      var numy = 120 * Math.sin(a) * Math.sin(b);
      var numz = 220 * Math.cos(a);

      // console.log(numo)
      //计算元素缩放大小
      tagEle[i].x = numx * 2
      tagEle[i].y = numy * 2
      tagEle[i].z = numz
      tagEle[i].s = 250 / (400 - tagEle[i].z)
    }
    //动画
    setInterval(() => {
      for (var i = 0; i < tagEle.length; i++) {
        var a = Math.acos(k);
        var numz = 240 * Math.cos(a);
        tagEle[i].s = 250 / (400 - tagEle[i].z)
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        var y1 = tagEle[i].y * cos - tagEle[i].z * sin;
        var z1 = tagEle[i].z * cos + tagEle[i].y * sin;
        tagEle[i].y = y1;
        tagEle[i].z = z1;

        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);
        var x1 = tagEle[i].x * cos - tagEle[i].z * sin;
        var z1 = tagEle[i].z * cos + tagEle[i].x * sin;
        tagEle[i].x = x1;
        tagEle[i].z = z1;
        this.setData({
          tagEle: tagEle
        })
      }
    }, 100)
  }
})