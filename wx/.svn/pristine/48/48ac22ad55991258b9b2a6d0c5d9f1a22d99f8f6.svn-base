//logs.js 广播添加完成
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({
  data: {
    news: {}
  },
  onLoad: function (option) {
    WxNotificationCenter.addNotification("conn.getNewsInfo", this.getNewsInfo, this)

    var sCmd = {
      "cmd": "conn.getNewsInfo",
      "data": { "id": option.id }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  onShow: function () {
    WxNotificationCenter.addNotification("conn.getNewsInfo", this.getNewsInfo, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("conn.getNewsInfo", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("conn.getNewsInfo", this)
  },

  //取行业资讯
  getNewsInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ "news": res.data.data[0] })
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
