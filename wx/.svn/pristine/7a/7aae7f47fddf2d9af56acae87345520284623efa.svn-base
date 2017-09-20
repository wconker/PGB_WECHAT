Page({
  data: {

    data: {},
    test: '<b style="color:red">dddd</b>'


  },
  go: function () {
    console.log(this.data,"ddd")
    wx.navigateTo({
      url: "/pages/tool/more/more?gsid="+this.data.data.gsbh,
    })
  },
  onLoad: function (options) {
    WxNotificationCenter.addNotification("conn.getWlList", this.getWlList, this)
    var sCmd = { "cmd": "conn.getWlList", "data": { "mddmc": options.key } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  getWlList: function (res) {
    if (res.data.code == 0) {
      this.setData({
        data: res.data.data[0]
      })
    }

    WxNotificationCenter.removeNotification("conn.getWlList", this)
  }

})
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成