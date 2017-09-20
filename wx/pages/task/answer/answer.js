var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
/*我要投标*/
Page({
  data: {
    showTopTips: false,
    tips: "",
    files: [],
    bdw: "",
    zbid: 0,
    bc: "",
    tbj: "",
    tbsm: "",
  },

  bindOk: function (e) {
    //todo...数据校验
    var sCmd = {
      "cmd": "business.addtb",
      "data": {
        "zbid": this.data.zbid,
        "tbj": this.data.tbj,
        "tbsm": this.data.tbsm,
        "fjbs": "1",
        "form_id":e.detail.formId
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

  tbjBindblur: function (e) {
    this.setData({ tbj: e.detail.value })
  },

  tbsmBindblur: function (e) {
    this.setData({ tbsm: e.detail.value })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  onLoad: function (e) {
    this.setData({ xjid: e.xjid })

    var sCmd = { "cmd": "business.getZbInfo", "data": { "zbid": e.zbid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getZbInfo", this.getZbInfo, this)
    WxNotificationCenter.addNotification("business.addtb", this.addtb, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getZbInfo", this)
    WxNotificationCenter.removeNotification("business.addtb", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getZbInfo", this)
    WxNotificationCenter.removeNotification("business.addtb", this)
  },

  getZbInfo: function (res) {
    this.setData({ zbid: res.data.data[0].zbid })
    this.setData({ bdw: res.data.data[0].bdw })
    this.setData({ bc: res.data.data[0].bc })
    this.setData({ tbj: res.data.data[0].bc })
  },

  addtb: function (res) {
    var that = this;
    if (res.data.code == 0) {
      //循环上传图片
      var fileIndex = 1;
      for (var item in that.data.files) {
        var sData = {
          "userid": getApp().data.userid,
          "imgtype": encodeURI('投标附件'),
          "imgname": fileIndex,
          "fjbs": res.data.data.fjbs,
          "tbid": res.data.data.tbid
        }
        wx.uploadFile({
          url: getApp().data.url,
          filePath: that.data.files[item],
          name: 'file',
          formData: sData,
          header: { "content-type": 'application/x-www-form-urlencoded' },
        })
        fileIndex++
      }
      wx.navigateBack({
        delta: 2, 
        success: function (res1) {
         console.error("Conker 执行")
          setTimeout(function(){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
           
            },2000);
          })
          
        }
      });
    } else {
      that.showTopTips(res.data.message)
    }
  }
});