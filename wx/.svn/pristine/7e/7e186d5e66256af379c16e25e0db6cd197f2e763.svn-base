var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    downImg: '/images/down.png',
    upImg: '/images/up.png',
    isFavourable: true,
    text: '',
    zbid: '',
    fromPage: '',
  },
  onLoad: function (e) {
    console.log(e.fromPage)
    this.setData({ zbid: e.zbid, fromPage: e.fromPage })
    WxNotificationCenter.addNotification("business.Evaluate_zb", this.Evaluate_zb, this)
    WxNotificationCenter.addNotification("business.Evaluate_tb", this.Evaluate_tb, this)
  },

  onUnload: function (e) {
    WxNotificationCenter.removeNotification("business.Evaluate_zb", this)
    WxNotificationCenter.removeNotification("business.Evaluate_tb", this)
  },

  up: function () {
    this.setData({ isFavourable: true, upImg: '/images/up_black.png', downImg: '/images/down.png' })
  },

  down: function () {
    this.setData({ isFavourable: false, upImg: '/images/up.png', downImg: '/images/down_black.png' })
  },

  textChange: function (e) {
    this.setData({ text: e.detail.value })
  },

  submit: function () {
    var cmdValue
    if (this.data.fromPage == 'tbPerson') {
      cmdValue = 'zb'
    } else {
      cmdValue = 'tb'
    }
    var sCmd = { "cmd": "business.Evaluate_"+cmdValue, "data": { "zbid": this.data.zbid, "pj": this.data.text, "pf": this.data.isFavourable ? 1 : 2 } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  Evaluate_zb: function (res) {
    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res_) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
        })

        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        break;
    }
  },

  Evaluate_tb: function (res) {
    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res_) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
        })

        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        break;
    }
  }

})