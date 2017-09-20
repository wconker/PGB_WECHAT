var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    plist: {},
    value: [],
    chakan:false
  },
  choose: function (e) {
    if (e.detail.value) {
      var selectall = this.data.plist;
      for (var i = 0; i < selectall.length; i++) {
        selectall[i].select = "ok"
      }
      this.setData({ plist: selectall });
    } else {
      var selectall = this.data.plist;
      for (var i = 0; i < selectall.length; i++) {
        selectall[i].select = ""
      }
      this.setData({ plist: selectall });
    }
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
   //-------------did by maodan----------- 
    this.setData({
      chakan:options.chakan
    })
    if (this.data.chakan){
      console.log(console.log('从查勘页面跳转过来的：', options.chakan))
    }
    //----------
    // WxNotificationCenter.addNotification("user.getToMeApplyrz", this.getToMeApplyrz, this)

    // WxNotificationCenter.addNotification("user.agreeAddFriend", this.agreeAddFriend, this)
    // this.getApplytoMe();
    this.getCompanyMemberListcmd();
  },
  onShow: function () {
    WxNotificationCenter.addNotification("user.getCompanyMemberList", this.getCompanyMemberList, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("user.getCompanyMemberList", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.getCompanyMemberList", this)
  },
  getCompanyMemberListcmd: function () {
    var sCmd = { "cmd": 'user.getCompanyMemberList', data: {} }
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  getCompanyMemberList: function (res) {
    switch (res.data.code) {
      case 0:
        var plist = res.data.data;
        for (var i = 0; i < plist.length; i++) {
          plist[i].select = ""
        }
        this.setData({ plist: plist });
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
  getApplytoMe: function () {
    var sCmd = { "cmd": 'user.getToMeApplyrz', data: {} }
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  bindsubmit: function () {
    var dataset = [];
    var selectvalue = this.data.plist;
    for (var i = 0; i < selectvalue.length; i++) {
      if (selectvalue[i].select == "ok") {
        dataset.push(selectvalue[i])
      }
    }
    getApp().data.select = dataset;
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
    console.log(getApp().data.select);
  },
  bindOk: function (e) {
    var select = e.target.dataset.select;
    
    console.log('查勘内部选择时选中的组员：',select)
    var lastvalue = this.data.plist;
    for (var i = 0; i < lastvalue.length; i++) {
      if (e.target.dataset.in == i) {
        switch (lastvalue[i].select) {
          case "":
            lastvalue[i].select = "ok";
            break;
          case "ok":
            lastvalue[i].select = '';
            break;
        }
      }
    }
    this.setData({ plist: lastvalue });
    //---------------did by maodan----------
    console.log('查看从哪个页面过来的：', this.data.chakan=="true")
    if(this.data.chakan=="true"){
      getApp().data.select = select;
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    }
    //--------
  },
  getToMeApplyrz: function (res) {
    switch (res.data.code) {
      case 0:

        this.setData({ plist: plist });
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
  agreeAddFriend: function (res) {
    switch (res.data.code) {
      case 0:
        this.getApplytoMe();
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