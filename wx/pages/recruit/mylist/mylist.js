//求职
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
//获取应用实例
var app = getApp()

Page({
  data: {
    records: []
  },
  onLoad: function (option) {
  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getMyGwList", this.getMyGwList, this)
    WxNotificationCenter.addNotification("business.delGw", this.delGw, this)
    this.reloadData()
  },
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getMyGwList",  this)
    WxNotificationCenter.removeNotification("business.delGw", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getMyGwList",  this)
    WxNotificationCenter.removeNotification("business.delGw", this)
  },

  reloadData: function () {
    var sCmd = { "cmd": "business.getMyGwList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  //我要求职
  bindNew: function (event) {
    var pageUrl;
    pageUrl = '/pages/recruit/new/new';
    wx.navigateTo({
      url: pageUrl
    })
  },
  bindDel: function (event) {
    var sCmd = { "cmd": "business.delGw", "data": { "gwid": event.currentTarget.id } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  getMyGwList: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ records: res.data.data })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 2000
        })
        break;
    }
  },

  delGw: function (res) {
    switch (res.data.code) {
      case 0:
        this.reloadData()
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
})
