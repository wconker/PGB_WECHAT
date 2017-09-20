/*招标详情*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    info: {},
    ckid: 0,
    fkyj: '',
    title: '',
    hidden: true,
    nocancel: true,
    email: '',
  },

  onLoad: function (e) {
    this.setData({ ckid: e.ckid })

    var sCmd = { "cmd": "business.getCkbInfo", "data": { "id": e.ckid } };
    wx.showToast({
      title: '详情加载中',
      icon: 'loading',
      duration: 10000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  bindckb: function (res) {
    console.log('/pages/task/record/record?zbid=' + this.data.info.id + '&mbbh=' + this.data.info.mbbh + '&bdw=' + this.data.info.ckdz + '&formPage=ckbInfo'
  )
    var pageUrl;
    pageUrl = '/pages/task/record/record?zbid=' + this.data.info.id + '&mbbh=' + this.data.info.mbbh + '&bdw=' + this.data.info.ckdz + '&formPage=ckbInfo';
    wx.navigateTo({
      url: pageUrl
    })
  },

  submit: function (res) {
    //todo...数据校验
    var sCmd = { "cmd": "business.Submit_Ck", "data": { "id": this.data.ckid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getCkbInfo", this.getCkbInfo, this)
    WxNotificationCenter.addNotification("business.Submit_Ck", this.Submit_Ck, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getCkbInfo", this)
    WxNotificationCenter.removeNotification("business.Submit_Ck", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getCkbInfo", this)
    WxNotificationCenter.removeNotification("business.Submit_Ck", this)
  },

  getCkbInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 3000
        })
        break;
    }
  },

  Submit_Ck: function (res) {
    switch (res.data.code) {
      case 101:
        wx.showModal({
          title: '提示',
          content: res.data.message,
          success: function (res_) {
            if (res_.confirm) {
              wx.navigateTo({
                url: '/pages/mine/bindinfo/bindinfo?witch=1',
              })
            }
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 3000
        })
        break;
    }
  },

});