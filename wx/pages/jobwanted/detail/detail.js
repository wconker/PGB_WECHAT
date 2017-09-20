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
    var that = this
    this.setData({ xjid: e.rcid })

    WxNotificationCenter.addNotification("business.getRcInfo", this.getRcInfo, this)

    var sCmd = { "cmd": "business.getRcInfo", "data": { "rcid": e.rcid } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getRcInfo", this.getRcInfo, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getRcInfo", this)

  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getRcInfo", this)
  },
  getRcInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
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

});