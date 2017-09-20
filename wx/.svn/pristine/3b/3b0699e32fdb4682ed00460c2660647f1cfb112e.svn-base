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
    WxNotificationCenter.addNotification("business.getGwList", this.getGwList, this)
    var sCmd = { "cmd": "business.getGwList", "data": { } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getGwList",  this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getGwList",  this)
  },

  //我要求职
  bindNew: function (event) {
    var pageUrl;
    pageUrl = '/pages/recruit/mylist/mylist';
    wx.navigateTo({
      url: pageUrl
    })
  },
  bindDetailTap: function (event) {
    var pageUrl;
    var id;
    id = event.currentTarget.id;
    pageUrl = '/pages/recruit/detail/detail' + '?gwid=' + id;
    // console.log(event);  
    wx.navigateTo({
      url: pageUrl,
      })
  },


  getGwList: function (res) {
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
  }
})
