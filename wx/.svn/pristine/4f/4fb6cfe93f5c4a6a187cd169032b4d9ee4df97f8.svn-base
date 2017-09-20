var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    records: {},
    tips: "",
    gwLists: ["总经理", "总经理助理", "副总经理", "技术总监", "信息技术部经理", "总估价师", "业务部经理", "分公司负责人", "部门经理", "高级估价师", "中级估价师", "初级估价师", "评估助理", "业务员", "办公室主任", "人事部经理", "信息采集员", "征收部经理", "征收人员", "办公文员", "估价员", "实习生"],
    xlLists: ["博士研究生", "硕士研究生", "本科", "专科"],
    qzzwLists: ["房地产估价师", "土地估价师", "资产评估师", "估价员", "无资格"],
    gzxzLists: ["专职", "兼职", "不限"],
    selectVar: '',

    citys: {},
    cityIndex: null,

  },
  //选择城市
  choseCity: function (e) {

    this.data.recordIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selectcity/selectcity'
    })

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
    WxNotificationCenter.addNotification("business.delRc", this.delRc, this)
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
    // console.log('onLoad test');  
    var sCmd = { "cmd": "business.getMyRcInfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getMyRcInfo", this)
    WxNotificationCenter.removeNotification("business.delRc", this)
    WxNotificationCenter.removeNotification("business.addRc", this)

  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getMyRcInfo", this)
    WxNotificationCenter.removeNotification("business.delRc", this)
    WxNotificationCenter.removeNotification("business.addRc", this)
  },
  //取我的简历
  getMyRcInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ records: res.data.data[0] })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 2000
        })
        break;
    }
    this.setData({ records: res.data.data[0] })
  },


  delRc: function (res) {
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