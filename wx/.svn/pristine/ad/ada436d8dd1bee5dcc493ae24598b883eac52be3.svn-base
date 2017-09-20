//新闻列表 广播添加完成  
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({
  data: {
    news: []
  },
  onLoad: function (option) {

    //TODO:增加分页 下拉刷新
    var sCmd = {
      "cmd": "conn.getNewsList",
      "data": { "rows": 50 }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onShow: function () {
    WxNotificationCenter.addNotification("conn.getNewsList", this.getNewsList, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("conn.getNewsList", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("conn.getNewsList", this)
  },
  bindNewsTap: function (event) {
    var pageUrl;
    var id;
    id = event.currentTarget.id;
    pageUrl = '/pages/news/detail/detail' + '?id=' + id;
    // console.log(event);  
    wx.navigateTo({
      url: pageUrl
    })
  },

  //取行业资讯
  getNewsList: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ news: res.data.data })
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
