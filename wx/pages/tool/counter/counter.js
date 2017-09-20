// pages/tool/counter/counter.js
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '非普通住宅', checked: 'true' },
      { name: '2', value: '普通住宅', },
      { name: '3', value: '非住宅' }
    ],
    sale: [
      { name: '1', value: '个人', checked: 'true' },
      { name: '2', value: '单位' }

    ],
    years: [
      { name: '1', value: '不足2年', checked: 'true' },
      { name: '2', value: '满2年' }

    ],
    percent: '',
    total: '',
    single: '',
    zzlx: 1,
    cslx: 1,
    zznx: 1,
    originalprice: '',
    czdj: '',
    czzj: '',
    ssf: '',
    pmf: '',
    pgf: '',
    yys: '',
    grsds: '',
    yhs: '',
    tdzzs: '',
    hj: ''
  },
  //radio单选事件
  houseChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      zzlx: e.detail.value
    })
  },
  saleChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      cslx: e.detail.value
    })
  },
  yearChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      zznx: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

console.log("option",options);
    if (options.total != null & options.total != undefined) {
      this.setData({ total: options.total, single: options.single })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    WxNotificationCenter.addNotification("business.computeTheDisposalOfTaxAndFee", this.computeTheDisposalOfTaxAndFee, this);

  },

  computeTheDisposalOfTaxAndFee: function (res) {
    console.log(res.data.data);
    if (res.data.code == 0) {
      this.setData({
        "czdj": res.data.data.czdj,
        "czzj": res.data.data.czzj,
        "ssf": res.data.data.ssf,
        "pmf": res.data.data.pmf,
        "pgf": res.data.data.pgf,
        "yys": res.data.data.yys,
        "grsds": res.data.data.grsds,
        "yhs": res.data.data.yhs,
        "tdzzs": res.data.data.tdzzs,
        "hj": res.data.data.hj
      })
    } else {
      wx.showToast({
        title: res.data.message,
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    WxNotificationCenter.removeNotification("user.setUserinfo", this)
    WxNotificationCenter.removeNotification("business.computeTheDisposalOfTaxAndFee", this)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //----------------------输入事件------------------------

  Total: function (e) {
    this.setData({ total: e.detail.value });
    console.log("总价：", e.detail.value)
  },
  single: function (e) {
    this.setData({ single: e.detail.value });
    console.log("单价：", e.detail.value)
  },
  Percent: function (e) {
    this.setData({ percent: e.detail.value });
    console.log("变现率：", e.detail.value)
  },
  OriginalPrice: function (e) {
    this.setData({ originalprice: e.detail.value });
    console.log("原价", e.detail.value)
  },




  //----------------------点击------------------------

  bindOk: function () {

    var sCmd = {
      "cmd": "business.computeTheDisposalOfTaxAndFee",
      "data": {
        "sign": getApp().data.sign,
        "userid": getApp().data.userid,
        "pgdj": this.data.single,
        "pgzj": this.data.total,
        "yj": this.data.originalprice,
        "zzlx": this.data.zzlx,
        "cslx": this.data.cslx,
        "zznx": this.data.zznx,
        "bxl": this.data.percent
      }
    };
    console.log("maomao:", sCmd)
    WxNotificationCenter.postNotificationName("send", sCmd);


  },

  //----------------------------------------------




})