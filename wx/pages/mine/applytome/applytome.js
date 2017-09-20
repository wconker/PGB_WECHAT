var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    member: 0,
    plist: {},
    admin: 100
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  
    this.setData({ admin: getApp().data.user.qygly });
    // this.getApplytoMe();
    // console.log(this.data.admin)

  },
  onShow: function () {
    WxNotificationCenter.addNotification("user.getToMeApplyrz", this.getToMeApplyrz, this)
    WxNotificationCenter.addNotification("user.agreeAddFriend", this.agreeAddFriend, this)
    this.getApplytoMe();
    //conker 判断是否管理员
    if (getApp().data.user.adminflag == 1) {
      this.setData({ member: 1 });
    }
    else {
      this.setData({ member: 0 });
    }

   
  },


  onHide: function () {
    WxNotificationCenter.removeNotification("user.getToMeApplyrz", this)
    WxNotificationCenter.removeNotification("user.agreeAddFriend", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("user.getToMeApplyrz", this)
    WxNotificationCenter.removeNotification("user.agreeAddFriend", this)
  },

  getApplytoMe: function () {

    var sCmd = { "cmd": 'user.getToMeApplyrz', data: {} }
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  bindOk: function (e) {
    var select = e.target.dataset.select;
    console.log(select)
    var sCmd = { "cmd": "user.agreeAddFriend", data: { "jgmc": select.gsmc, "squserid": select.squserid } };
    console.log(sCmd);
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  bindInvite: function(e) {
    console.log('点击邀请分享：', this.onShareAppMessage())
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '全国估价师共享协作平台',
      path: 'pages/index/index'
    }
  },

  manager: function (e) {
    var me = this;
    var select = e.target.dataset.select;
    wx.showActionSheet({
      itemList: ['设置部门', '移除'],
      success: function (res) {
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: "/pages/core/selectap/selectap?userid=" + select.squserid + "&admin=" + select.adminflag,
            })

            break;
          case 1:
            WxNotificationCenter.addNotification("user.removeMember", me.removeMember, me)
            var sCmd = { "cmd": "user.removeMember", data: { "memberUserid": select.squserid } };
            WxNotificationCenter.postNotificationName("send", sCmd);
            break;

        }

      },

    })

  },

  removeMember: function (res) {
    if (res.data.code == 0) {
      wx.showToast({
        title: res.data.message,
        icon: 'info',
        duration: 2000
      })
      this.getApplytoMe();
    }
  },

  getToMeApplyrz: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ plist: res.data.data });
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'info',
          duration: 2000
        })
        break;
    }
  },
  agreeAddFriend: function (res) {
    switch (res.data.code) {
      case 0:
        this.getApplytoMe();
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
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