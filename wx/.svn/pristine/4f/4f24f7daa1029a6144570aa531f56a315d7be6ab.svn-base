var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    tips: "",
    files: [],
    xjbdw: "",
    xjid: 0,

    jzmj: "",
    dj: "",
    zj: "",
    bz: "",
    dlmc: "",
  },

  TotalPrice: function (mj, dj) {
    var total = 0;

    if (mj != "" && dj != "") {
      total = (parseFloat(mj) * parseFloat(dj) / 10000).toFixed(2);
    }
    return total;
  },


  bindOk: function (e) {
    var that = this;

    //todo...数据校验
    var sCmd = {
      "cmd": "business.addbj",
      "data": {
        "xjid": this.data.xjid,
        "mj": this.data.jzmj,
        "dj": this.data.dj,
        "zj": this.data.zj,
        "bz": this.data.bz,
        "fjbs": "1",
        "form_id": e.detail.formId
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

  mjBindblur: function (e) {
    var me = this;
    var mj = e.detail.value;
    var dj = this.data.dj;
    this.setData({
      zj: me.TotalPrice(mj, dj),
      jzmj: e.detail.value
    })
  },

  djBindblur: function (e) {
    var me = this;
    var mj = this.data.jzmj;
    var dj = e.detail.value
    this.TotalPrice(mj, dj);

    this.setData({
      zj: me.TotalPrice(mj, dj),
      dj: e.detail.value
    })
  },
  zjBindblur: function (e) {
    this.setData({ zj: e.detail.value })
  },
  bzBindblur: function (e) {
    this.setData({ bz: e.detail.value })
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

    var sCmd = { "cmd": "business.getxjInfo", "data": { "xjid": e.xjid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getxjInfo", this.getxjInfo, this)
    WxNotificationCenter.addNotification("business.addbj", this.addbj, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getxjInfo", this)
    WxNotificationCenter.removeNotification("business.addbj", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getxjInfo", this)
    WxNotificationCenter.removeNotification("business.addbj", this)
  },

  //询价详情
  getxjInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({ xjbdw: res.data.data[0].xjbdw })
        this.setData({ jzmj: res.data.data[0].mj })
        this.setData({ dlmc: res.data.data[0].dlmc })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 2000
        })
        break;
    }
  },

  //报价
  addbj: function (res) {
    var that = this;
    switch (res.data.code) {
      case 0:
        //循环上传图片
        var fileIndex = 1;
        for (var item in that.data.files) {
          console.log(fileIndex)
          var sData = {
            "userid": getApp().data.userid,
            "imgtype": encodeURI('报价附件'),
            "imgname": fileIndex,
            "fjbs": res.data.data.fjbs,
            "bjid": res.data.data.bjid
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

        //返回询价页面
        wx.navigateBack({
          delta: 2, // 回退前 delta(默认为1) 页面
          success: function (res) {
            // success
            wx.showToast({
              title: '报价成功',
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