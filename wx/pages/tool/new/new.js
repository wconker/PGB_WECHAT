var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    records: {},
    tips: "",
    selectVar: '',
    wylx: '',
    wylxs: [],
    wylxIndex: null,
  },


  //打开单选页面
  bindSelectS: function (e) {
    this.data.selectVar = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selects/selects?bt=' + e.currentTarget.dataset.bt + '&options=' + e.currentTarget.dataset.options,
    })
  },

  //打开多选页面
  bindSelectM: function (e) {
    this.data.selectVar = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selectm/selectm?bt=' + e.currentTarget.dataset.bt + '&options=' + e.currentTarget.dataset.options,
    })
  },
  //获取系统代码字典
  getSyType: function (res) {
    this.setData({ wylxs: res.data.data[0].wylxs })
  },


  bindOk: function () {


    //todo...数据校验
    var sCmd = {
      "cmd": "business.addRc",
      "data": {
        "xm": this.data.records.xm,
        "lxsj": this.data.records.lxsj,
        "gw": this.data.records.gw,
        "gzxz": this.data.records.gzxz,
        "gzdd": this.data.citys.dqmc,
        "bz": this.data.records.bz,
        "lxyx": this.data.records.lxyx,
        "xl": this.data.records.xl,
        "gzjy": this.data.records.gzjy,
        "xcyq": this.data.records.xcyq,
        "yyzg": this.data.records.yyzg,
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },


  bindCancel: function () {
    //todo...数据校验
    var sCmd = { "cmd": "business.delRc", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  showTopTips: function (s) {
    var that = this
    this.setData({
      tips: s,
      showTopTips: true,
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },


  xmBindblur: function (e) {
    this.setData({ 'records.xm': e.detail.value })
  },

  lxyxBindblur: function (e) {
    this.setData({ 'records.lxyx': e.detail.value })
  },

  gzjyBindblur: function (e) {
    this.setData({ 'records.gzjy': e.detail.value })
  },

  xcyqBindblur: function (e) {
    this.setData({ 'records.xcyq': e.detail.value })
  },

  lxsjBindblur: function (e) {
    this.setData({ 'records.lxsj': e.detail.value })
  },
  bzBindblur: function (e) {
    this.setData({ 'records.bz': e.detail.value })
  },

  bindCityChange: function (e) {
    this.setData({
      gzdd: e.detail.value
    })
  },

  onShow: function () {


    WxNotificationCenter.addNotification("business.getMyRcInfo", this.getMyRcInfo, this)
    WxNotificationCenter.addNotification("conn.getSyType", this.delRc, this)
    WxNotificationCenter.addNotification("business.addRc", this.addRc, this)

    if (getApp().data.city != "!!!") {
      this.setData({ citys: getApp().data.city });
    }
    //定位获取
    if (this.data.citys.dqdm == undefined) {
      this.setData({ citys: getApp().data.local });
    }
    getApp().data.city = "!!!";
    var selectVar = this.data.selectVar
    if (selectVar != '') {
      var sVar = selectVar
      this.setData({ [`${sVar}`]: getApp().data.select })
      this.data.selectVar = ''
    }
  },

  onLoad: function () {
     var sCmd = { "cmd": "conn.getSyType", "data": { "type": "xj" } };
     WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getMyRcInfo", this)
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addRc", this)

  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getMyRcInfo", this)
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addRc", this)
  },
 
  addRc: function (res) {
    if (res.data.code == 0) {
      //返回
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (resNav) {
          // success
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else {
      this.showTopTips(res.data.message)
    }
  }
});