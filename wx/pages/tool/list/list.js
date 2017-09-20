var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    ckbList: [],
    hidden: true,
    _ID: 0,
  },
  onLoad: function (options) {

  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getCkbList", this.getCkbList, this)
    WxNotificationCenter.addNotification("business.AgainSendEmail_kcfile", this.AgainSendEmail_kcfile, this)
    this.reloadData()
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getCkbList", this)
    WxNotificationCenter.removeNotification("business.AgainSendEmail_kcfile", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getCkbList", this)
    WxNotificationCenter.removeNotification("business.AgainSendEmail_kcfile", this)
  },

  onPullDownRefresh: function () {
    this.reloadData()
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    })
  },

  reloadData: function () {
    var sCmd = { "cmd": "business.getCkbList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  bindNew: function (res) {
    wx.navigateTo({
      url: '/pages/task/myrecord/myrecord'
    })
  },

  bindCkbDetail: function (event) {
    var pageUrl;
    pageUrl = '/pages/tool/detail/detail?ckid=' + event.currentTarget.id;
    wx.navigateTo({
      url: pageUrl
    })
  },

  getCkbList: function (res) {
    wx.stopPullDownRefresh()
    switch (res.data.code) {
      case 0:
        this.setData({ ckbList: res.data.data })
        break;
      default:
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'fail',
        //   duration: 2000
        // })
        break;
    }
  },

  sendTask: function (e) {
    var _email = getApp().data.email
    this.setData({ hidden: false, nocancel: false, _ID: e.target.id, email: _email })
  },

  bindinput: function (e) {
    this.setData({ email: e.detail.value })
  },

  cancel: function () {
    this.setData({
      hidden: true
    });
  },

  confirm: function () {
    var that = this
    this.setData({
      nocancel: !this.data.nocancel,
      hidden: true
    });

    wx.getStorage({
            key: 'email',
            success: function (res) {
                if (res.data != that.data.email) {
                    try {
                        wx.setStorageSync('email', that.data.email)
                    } catch (e) {
                    }
                }
            },
            fail: function () {
                wx.setStorage({
                    key: "email",
                    data: that.data.email
                })
            }
        })

    var sCmd = {
      "cmd": "business.AgainSendEmail_kcfile",
      "data": { "ckid": this.data._ID, "email": this.data.email }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  AgainSendEmail_kcfile: function (res) {
    wx.showToast({
      title: res.data.message,
      icon: 'success',
      duration: 2000
    })
  }

})