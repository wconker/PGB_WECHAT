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
    WxNotificationCenter.addNotification("business.getRcList", this.getRcList, this)
    this.reloadData()
  },
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getRcList", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getRcList", this)
  },

  reloadData: function () {
    var that = this

    var sCmd = { "cmd": "business.getRcList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  //我要求职
  bindNew: function (event) {
    var pageUrl;
    pageUrl = '/pages/jobwanted/new/new';
    wx.navigateTo({
      url: pageUrl
    })
  },
  bindDetailTap: function (event) {
    var pageUrl;
    var id;
    id = event.currentTarget.id;
    pageUrl = '/pages/jobwanted/detail/detail' + '?rcid=' + id;
    // console.log(event);  
    wx.navigateTo({
      url: pageUrl
    })
  },
  getRcList: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ records: res.data.data })
        break;
      default:
        break;
    }
  }
})
