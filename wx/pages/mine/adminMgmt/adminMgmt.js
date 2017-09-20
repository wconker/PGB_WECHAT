var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    list: {},
    userInfo: {},
    ce: ''
  },
  onLoad: function (options) {
    WxNotificationCenter.addNotification("admin.getAdminDataList", this.getAdminDataList, this)
    var sCmd = { "cmd": "admin.getAdminDataList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onShow: function () {

  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("admin.getAdminDataList", this)
  },

  onPullDownRefresh: function () {
    var sCmd = { "cmd": "admin.getAdminDataList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
    wx.showToast({
          title: '数据刷新中',
          icon: 'loading',
          duration: 2000
        })
  },

  getAdminDataList: function (res) {
    wx.stopPullDownRefresh();
    switch (res.data.code) {
      case 0:
        this.setData({ userInfo: res.data.data.userinfo, list: res.data.data.list })

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