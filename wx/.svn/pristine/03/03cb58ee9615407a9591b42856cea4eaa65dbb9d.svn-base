Page({
  data: {
    userInfo: {},
    xm: "",
    fczch: "",
    zczch: "",
    tdzch: "",
  },
  onLoad: function (options) {

    WxNotificationCenter.addNotification("user.setUserinfo", this.setUserinfo, this)
    this.setData({
      userInfo: getApp().data.user
    })
    console.log(this.data.userInfo)
  },
  setxm: function () {

    this.setData({
      xm: e.detail.value
    })
  },
  setfczch: function () {

    this.setData({
      fczch: e.detail.value
    })
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("user.setUserinfo", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.setUserinfo", this)
  },

  bindOk: function (e) {

    var me = this;

    var sCmd = {
      "cmd": "user.setUserinfo", "data": {
        "userid": getApp().data.userid,
        "nc": this.data.nc,
        "gsmc": this.data.jgmc,
        "fgzch": me.fczch,
        "tgzch": me.tdzch,
        "xm": me.fczch,
        "zczch": me.zczch,
        "form_id": e.detail.formId
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },


  setUserinfo: function (res) {
    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1,
          success: function () {
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


var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
