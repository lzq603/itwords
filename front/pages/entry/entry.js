const app = getApp()
const AV = require('../../libs/leancloud/av-weapp-min.js')
const util = require('../../libs/util.js')
Page({
  data: {
    item: {
      "title": "duang",
      "speak": "duāng",
      "imageUrl": "http://7xjljf.com1.z0.glb.clouddn.com/image/internet-slangs/duang-01.jpg",
      "tags": {
        "alt": "亦作",
        "altDfn": "「加特效」。"
      },
      "explanation": "拟声词。出自 2004 年成龙所代言的霸王洗发水广告，在 2015 年初被用户名为「绯色toy」的用户制作成恶搞视频发表于哔哩哔哩动画，与「其实一开始我是拒绝的」同时走红。被用来形容某个动作效果、模仿某种特效配音，多指一瞬间达到的特殊效果。",
      "attachments": [
        {
          "type": "quote",
          "text": "当我第一次知道要拍洗发水广告的时候，其实我是拒绝的。因为我觉得，你不能叫我拍马上就拍。第一我要试一下，我又不想说，一个广告拍完后加上好多特技，头发 duang（注：原文为「动啊」，「duang」可能系空耳讹传），很黑，很亮，很柔，结果观众出来一定会骂我，根本没有这种头发，证明上面这个是假的。"
        }
      ],
      "meta": {
        "derivation": "百度百科",
        "collectionDate": "2018 年 12 月"
      }
    },
    attachments: [
      {
        "type": "quote",
        "text": "当我第一次知道要拍洗发水广告的时候，其实我是拒绝的。因为我觉得，你不能叫我拍马上就拍。第一我要试一下，我又不想说，一个广告拍完后加上好多特技，头发 duang（注：原文为「动啊」，「duang」可能系空耳讹传），很黑，很亮，很柔，结果观众出来一定会骂我，根本没有这种头发，证明上面这个是假的。"
      }
    ],
    footnotes: {},
    userInfo: {},
    comments: [],
    commentObj: {},
    quote:[]
  },
  // 监听页面加载
  onLoad: function (options) {
    // 获取用户信息
    var that = this
    
    //获取词条
    wx.request({
      url: app.globalData.host + 'getWord?id=' + options.entryId,
      success(res){
        console.log(res.data)
        res.data.meta = {
          "derivation": "百度百科",
          "collectionDate": "2018 年 12 月"
        }
        //获取拼音
        wx.request({
          url: 'http://120.79.54.89:3000?word=' + res.data.key,
          success(result){
            console.log(result)
            res.data.speak = result.data
            that.setData({ item: res.data })
          }
        })
      },
      fail(res){
        console.log(res.data)
      }
    })
    wx.request({
      url: app.globalData.host + 'getLinks?kid=' + options.entryId,
      success(res) {
        console.log(res.data)
        that.setData({ quote: res.data })
      },
      fail(res) {
        console.log(res.data)
      }
    })
    console.log('Entry Page: onLoad.')
  },
  // 监听页面初次渲染完成
  onReady: function () {
    // 设定导航栏标题
    // wx.setNavigationBarTitle({
    //   title: this.data.item.title
    // })
    console.log('Entry Page: onReady.')
  },
  // 监听页面显示
  onShow: function () {
    console.log('Entry Page: onShow.')
  },
  // 监听页面隐藏
  onHide: function () {
    console.log('Entry Page: onHide.')
  },
  // 监听页面卸载
  onUnload: function () {
    console.log('Entry Page: onUnload.')
  },
  // 监听用户下拉刷新动作
  onPullDownRefresh: function () {
    console.log('Entry Page: onPullDownRefresh.')
  },
  // 评论框输入事件
  commentInput: function (e) {
    this.data.commentObj.author = this.data.userInfo;
    this.data.commentObj.commentStr = e.detail.value;
    this.data.commentObj.createdAt = new Date();
    this.data.commentObj.formatDate = util.formatTime(this.data.commentObj.createdAt);
    // console.log(this.data.commentObj)
  },
  // 评论框提交事件
  commentSubmit: function (e) {
    if (!this.data.commentObj.commentStr || this.data.commentObj.commentStr === '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'success',
        duration: 2000
      });
      return false;
    }
    // 提交评论
    this.data.comments.unshift(this.data.commentObj);
    var query = AV.Object.createWithoutData('entry', this.options.entryId);
    query
      .add('comments', this.data.comments)
    query
      .save()
      .then(item => {
        wx.redirectTo({
          url: './entry?entryId=' + this.options.entryId
        });
      }, (error) => {
        throw error;
      });
    // console.log(this.data.comments)
    console.log('Entry Page: Submitted comment.')
  }
})
