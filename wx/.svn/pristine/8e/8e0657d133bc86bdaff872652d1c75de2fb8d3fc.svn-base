var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    records: {},
    tips: "错误提示",
      gwLists:["总经理","总经理助理","副总经理","技术总监","信息技术部经理","总估价师","业务部经理","分公司负责人","部门经理","高级估价师","中级估价师","初级估价师","评估助理","业务员","办公室主任","人事部经理","信息采集员","征收部经理","征收人员","办公文员","估价员","实习生"],
    xlLists:["博士研究生","硕士研究生","本科","专科"],
    zgyqLists: ["房估", "土估", "资估"],
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
    console.log(this.data.citys.dqmc)
    var sCmd = {
      "cmd": "business.addGw",
      "data": {
        "gsmc": this.data.records.gsmc,
        "lxdh": this.data.records.lxdh,
        "gw": this.data.records.gw,
        "gzxz": this.data.records.gzxz,
        "gzdd": this.data.citys.dqmc,
        "zgyq": this.data.records.zgyq,
        "bz": this.data.records.bz,
        "qyyx": this.data.records.qyyx,
        "gwyq": this.data.records.gwyq,
        "xcbz": this.data.records.xcbz,
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


  gsmcBindblur: function (e) {
    this.setData({ 'records.gsmc': e.detail.value })
  },

  lxdhBindblur: function (e) {
    this.setData({ 'records.lxdh': e.detail.value })
  },
  bzBindblur: function (e) {
    this.setData({ 'records.bz': e.detail.value })
  },
   qyyxBindblur: function (e) {
    this.setData({ 'records.qyyx': e.detail.value })
  },
   gwyqBindblur: function (e) {
    this.setData({ 'records.gwyq': e.detail.value })
  },
   xcbzBindblur: function (e) {
    this.setData({ 'records.xcbz': e.detail.value })
  },

  bindCityChange: function (e) {
    this.setData({
      gzdd: e.detail.value
    })
  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getMyGwTemplate", this.getMyGwTemplate, this)
    WxNotificationCenter.addNotification("business.addGw", this.addGw, this)
    WxNotificationCenter.addNotification("business.delRc", this.delRc, this)
    if (getApp().data.city != "!!!") {
      this.setData({ citys: getApp().data.city });
    }
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
    getApp().data.select = "!!!";
  },
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getMyGwTemplate", this)
    WxNotificationCenter.removeNotification("business.addGw", this)
    WxNotificationCenter.removeNotification("business.delRc", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getMyGwTemplate", this)
    WxNotificationCenter.removeNotification("business.addGw", this)
    WxNotificationCenter.removeNotification("business.delRc", this)
  },

  onLoad: function () {
    var sCmd = { "cmd": "business.getMyGwTemplate", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

 //取我的岗位模板
  getMyGwTemplate: function (res) {
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

  addGw: function (res) {
    switch (res.data.code) {
      case 0:
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
        break;
      default:
        this.showTopTips(res.data.message)
        break;
    }
  },


  delRc: function (res) {
    switch (res.data.code) {
      case 0:
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
        break;
      default:
        this.showTopTips(res.data.message)
        break;
    }
  }
});