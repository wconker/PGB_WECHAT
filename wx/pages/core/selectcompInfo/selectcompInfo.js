var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({

  /**
   * 页面的初始数据
   */
  data: {

    CompInfo: {}


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



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
    WxNotificationCenter.addNotification("business.getComDetail", this.getComDetail, this)
    var sCmd = { "cmd": "business.getComDetail", "data": { "company_id": 102 } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getComDetail", this)
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
  getComDetail: function (res) {
    if (res.data.code == 0) {
      this.setData({
        CompInfo: res.data.data
      });
      console.log(this.data.CompInfo)
    }
  }
})