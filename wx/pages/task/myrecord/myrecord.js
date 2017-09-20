var mZhlxIndex = 0
/*查勘工具*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    tips: "",
    ckdz: "",
    zblbs: [],
    zblbIndex: null,

    kcbmbs: [],
    kcbmbIndex: null,

    ssms: "",
    //查看表图的布尔值
    ckbt:''
  },
  //查看表的示例图
  seeExample: function (){
    this.setData({
      ckbt:2
    })
  },

  bindOk: function (e) {
    mZhlxIndex = this.data.zhlxIndex
    console.log("kcbmbIndex", this.data.kcbmbIndex)
    if (this.data.kcbmbIndex==null){
      wx.showToast({
        title: '请选择查勘表',
        icon: 'success',
        duration: 2000
      });
    }
    //todo...数据校验
    var sCmd = {
      "cmd": "business.addCkb",
      "data": {
        "ckdz": this.data.ckdz,
        "mbbh": this.data.kcbmbs[this.data.kcbmbIndex].MBBH,
        "bz": this.data.xxsm
      }
    };

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

  bdwBindblur: function (e) {
    this.setData({ ckdz: e.detail.value })
  },
  xxsmBindblur: function (e) {
    this.setData({ xxsm: e.detail.value })
  },

  bindZblbChange: function (e) {
    this.setData({
      zblbIndex: e.detail.value
    })
  },
  bindZhlxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      zhlxIndex: e.detail.value,
    })
  },

  onShow: function () {
    WxNotificationCenter.addNotification("conn.getSyType", this.getSyType, this)
    WxNotificationCenter.addNotification("business.addCkb", this.addCkb, this)
  },
  onHide: function () {
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addCkb", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addCkb", this)
  },

  bindKcbmbChange: function (e) {
    console.log(e)
    this.setData({
      kcbmbIndex: e.detail.value
    })
  },

  onLoad: function () {

    var sCmd = { "cmd": "conn.getSyType", "data": { "type": "zb" } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  getSyType: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ zblbs: res.data.data[0].zblb })
        this.setData({ yxsjs: res.data.data[0].yxsj })
        this.setData({ kcbmbs: res.data.data[0].kcbmb })
        this.setData({ zhlxjs: res.data.data[0].zhlx })
        this.setData({ zhlxIndex: mZhlxIndex })
        break;
      default:
        break;
    }
  },

  addCkb: function (res) {
    var that = this
    var zbid = res.data.data.zbid
    console.log("maodan going", res.data.data.ckid)
    var ckid = res.data.data.ckid
    switch (res.data.code) {
      case 0:
        // wx.navigateBack({
        //   delta: 1,
        //   success: function (res1) {
        //     // success
        //     wx.showToast({
        //       title: res.data.message,
        //       icon: 'success',
        //       duration: 3000
        //     })
        //   }
        // })
        var pageUrl;
        //pageUrl = '/pages/task/record/record?zbid=' + this.data.info.id + '&mbbh=' + this.data.info.mbbh + '&bdw=' + this.data.info.ckdz + '&formPage=ckbInfo';
        pageUrl = '/pages/task/record/record?zbid=' + res.data.data.ckid+'&formPage=ckbInfo';
        wx.navigateTo({
          url: pageUrl
        })
        break;
      default:
        this.showTopTips(res.data.message)
        break;
    }
  }
});