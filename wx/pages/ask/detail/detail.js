var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    files: [],
    info: {},
    xjid: 0,
    fromPage: ''
  },

  onShareAppMessage: function () {
    var pageUrl = '/pages/ask/detail/detail?xjid=' + this.data.xjid;
    pageUrl = '/pages/index/index'
    return {
      title: this.data.info.xjbdw,
      path: pageUrl
    }
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  bindBj: function (e) {


    //判断是否认证，引导去认证
    if (getApp().data.user.scrzbz != 2) {
      wx.showModal({
        title: '提示',
        content: '实名认证后才可报价，是否前往认证?',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/mine/auth/certification/certification'
            })
          }
        }
      });
      return;
    }
    if (getApp().data.user.fdcgjsbz != 2 && getApp().data.user.tdgjsbz != 2 && getApp().data.user.zcpgsbz != 2) {
      wx.showModal({
        title: '提示',
        content: '只有估价师才可以报价，是否前往认证?',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/mine/auth/fcpgs_auth/fcpgs_auth'
            })
          }
        }
      });
      return;
    }
    var pageUrl;
    pageUrl = '/pages/ask/answer/answer?xjid=' + this.data.xjid;
    wx.navigateTo({
      url: pageUrl
    })
  },

  bindRepost: function () {
    var sCmd = { "cmd": "business.endXj", "data": { "xjid": this.data.xjid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onLoad: function (e) {

    //conker 去过取不到getuserinfo 就去请求
    if (!getApp().data.factory.checkuser()) {
      WxNotificationCenter.addNotification("user.getUserinfo", this.getUserinfo, this)
      var getUsercmd = { "cmd": "user.getUserinfo", "data": {} };
      WxNotificationCenter.postNotificationName("send", getUsercmd);
    }
    this.setData({ xjid: e.xjid, fromPage: e.fromPage })
    //看是不是能取到user的全局
    var vTmp
    console.log(e.xjid)
    if (this.data.fromPage == 'myXjList') {
      vTmp = 'getMyxjInfo'
    } else {
      vTmp = 'getxjInfo'
    }
    var sCmd = { "cmd": "business." + vTmp, "data": { "xjid": parseInt(e.xjid) } };
    wx.showToast({
      title: '详情加载中',
      icon: 'loading',
      duration: 10000
    })

    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  getUserinfo: function (res) {
    switch (res.data.code) {
      case 0:
        getApp().data.user = res.data.data[0];
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 2000
        })
        break;
    }
  },


  onShow: function () {


    
    WxNotificationCenter.addNotification("business.getxjInfo", this.getxjInfo, this)
    WxNotificationCenter.addNotification("business.getMyxjInfo", this.getMyxjInfo, this)
    WxNotificationCenter.addNotification("business.endXj", this.endXj, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getxjInfo", this)
    WxNotificationCenter.removeNotification("business.getMyxjInfo", this)
    WxNotificationCenter.removeNotification("business.endXj", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getxjInfo", this)
    WxNotificationCenter.removeNotification("business.getMyxjInfo", this)
    WxNotificationCenter.removeNotification("business.endXj", this)
  },

  //询价详情
  getxjInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        this.data.files.length = 0
        for (var item in res.data.data[0].cqz_img) {
          this.setData({ files: this.data.files.concat(res.data.data[0].cqz_img[item].img_url) })
        }
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 1000
        })
        break;
    }

  },

  getMyxjInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        this.data.files.length = 0
        for (var item in res.data.data[0].cqz_img) {
          this.setData({ files: this.data.files.concat(res.data.data[0].cqz_img[item].img_url) })
        }
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 1000
        })
        break;
    }
  },

  endXj: function (res) {
    var that = this;
    switch (res.data.code) {
      case 0:
        //返回询价页面
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res) {
            // success
            var pageUrl;
            console.log('sxd', that.data.xjid)
            pageUrl = '/pages/ask/new/new?xjid=' + that.data.xjid;
            wx.navigateTo({
              url: pageUrl
            })
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 2000
        })
        break
    }
  }


});