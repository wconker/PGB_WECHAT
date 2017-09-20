var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    info: {},
    rcid: 0
  },

  bindTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },

  onLoad: function (e) {
    this.setData({ xjid: e.rcid })


    var sCmd = { "cmd": "business.getGwInfo", "data": { "gwid": e.gwid } };
    WxNotificationCenter.postNotificationName("send", sCmd);


  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getGwInfo", this.getGwInfo, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getGwInfo",  this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getGwInfo",  this)
  },

  getGwInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 2000
        })
        break;
    }
  }

});