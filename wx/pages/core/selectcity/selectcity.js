var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var app = getApp();
Page({
  data: {
    searchtext: '',
    tt: [1, 2, 3, 5],
    cityarr: [],
    citycopy: [],
    hotcity: [],
    hiscity: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    var me = this;
    var sCmd = { "cmd": "business.getCityList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getCityList", this.getCityList, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getCityList", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getCityList", this)
  },
  

  selectitem: function (e) {
    getApp().data.select = e.target.dataset.dqmc;
   getApp().data.city = e.target.dataset.dqmc;  //类似一个备份，避免遇到某个页面重复
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  delettext: function () {
    var arr = this.data.citycopy;
    this.setData({
      searchtext: "",
      cityarr: arr
    })
  },
  filterworld: function (e) {

    var arr = this.data.citycopy;
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].dqmc.indexOf(e.detail.value) >= 0) {
        newarr.push(arr[i]);

      }
    }
    this.setData({
      cityarr: newarr
    })
  },
 
  //获取城市列表
  getCityList: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({
          cityarr: res.data.data.all,
          citycopy: res.data.data.all,
          hotcity: res.data.data.hot,
          hiscity: res.data.data.his,
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