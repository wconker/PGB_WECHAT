var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    docList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var sCmd = {
      "cmd": "business.getDocuments",
      "data": {}
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

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
    WxNotificationCenter.addNotification("business.getDocuments", this.getDocumentsList, this);
    WxNotificationCenter.addNotification("business.loadDocuments", this.downFile, this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getDocuments", this);
    WxNotificationCenter.removeNotification("business.loadDocuments", this)
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
    var sCmd = {
      "cmd": "business.getDocuments",
      "data": {}
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

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
  getDocumentsList: function (res) {

    this.setData({
      docList: res.data.data
    });
    wx.stopPullDownRefresh();
    console.dir(this.data.docList);
  },

  downFile: function (res) {
    var me = this;
    wx.showLoading({
      title: '加载中。。。',
    });
    wx.request({
      url: res.data.data.url,
      method: 'post',
      success: function (res_down) {
        var url_down = res_down.data;
        me.openFile(url_down);
      },
      fail: function (res) {
        wx.showToast({
          title: "获取文件路径失败！",
          icon: 'warn',
          duration: 2000
        })
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
  },


  openFile: function (url) {

    console.log(url, "wlj");
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success: function (res_) {
        wx.openDocument({
          filePath: res_.tempFilePath,
          success: function (res_) {
            wx.showToast({
              title: "打开文档成功",
              icon: 'warn',
              duration: 2000
            })
          },
          fail: function (res_) {
            wx.showToast({
              title: "打开文档失败",
              icon: 'warn',
              duration: 2000
            })
          },
          complete() {

          }
        })
      }
    })
  },
  download: function (e) {
    var sCmd = {
      "cmd": "business.loadDocuments",
      "data": {
        "id": e.currentTarget.dataset.index
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);



  }



})