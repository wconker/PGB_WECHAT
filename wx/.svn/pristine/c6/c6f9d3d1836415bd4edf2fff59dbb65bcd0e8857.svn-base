var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    tips: "",
    zbfiles: [],
    ckfiles: [],
    zbid: 0,
    zbinfo: {},
  },

  //现场签到
  bindQd: function () {
    var that = this;
    var jd = '';
    var wd = '';

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        wd = res.latitude
        jd = res.longitude

        var sCmd = { "cmd": "business.xcSign", "data": { "zbid": that.data.zbid, "jd": jd, "wd": wd, "qddd": "", } };
        WxNotificationCenter.postNotificationName("send", sCmd);
      },
      fail: function () {
        wx.showToast({
          title: "无法获得手机定位信息",
          icon: 'warn',
          duration: 3000
        })
      }
    })
  },

  //打电话
  bindTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },


  //查看位置
  bindOpenLocation: function () {
    var that = this;
    console.log(this.data.zbinfo)
    var jd = Number(this.data.zbinfo['qdjd']);
    var wd = Number(this.data.zbinfo['qdwd']);



    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })



    // wx.openLocation({
    //   latitude: wd, // 纬度，范围为-90~90，负数表示南纬
    //   longitude: jd, // 经度，范围为-180~180，负数表示西经
    //   scale: 28, //jd缩放比例
    //   // name: 'name', // 位置名
    //   // address: 'address', // 地址的详细说明

    // })

  },

  // updownTask: function () {
  //   var sCmd = { "cmd": "business.download_zb_file", "data": { "zbid": this.data.zbid, } };
  //   WxNotificationCenter.postNotificationName("send", sCmd);
  // },

  bindOk: function (e) {
    //todo...数据校验
    var sCmd = { "cmd": "business.submitKcjl", "data": { "zbid": this.data.zbid, "form_id": e.detail.formId } };
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
          ckfiles: that.data.ckfiles.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewZbImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.zbfiles // 需要预览的图片http链接列表
    })
  },

  previewCkImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.ckfiles // 需要预览的图片http链接列表
    })
  },

  onLoad: function (e) {
    this.setData({ zbid: e.zbid })

    // WxNotificationCenter.addNotification("business.download_zb_file", this.download_zb_file, this)

    this.getZbInfo()

  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getZbInfo", this.getZbInfoNotification, this)
    WxNotificationCenter.addNotification("business.xcSign", this.xcSign, this)
    WxNotificationCenter.addNotification("business.submitKcjl", this.submitKcjl, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getZbInfo", this)
    WxNotificationCenter.removeNotification("business.xcSign", this)
    WxNotificationCenter.removeNotification("business.submitKcjl", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getZbInfo", this)
    WxNotificationCenter.removeNotification("business.xcSign", this)
    WxNotificationCenter.removeNotification("business.submitKcjl", this)
  },

  getZbInfo: function () {
    var sCmd = { "cmd": "business.getZbInfo", "data": { "zbid": this.data.zbid } };
    wx.showToast({
      title: '查勘表加载中',
      icon: 'loading',
      duration: 10000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  getZbInfoNotification: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ zbinfo: res.data.data[0] })
        console.log(res)
        this.data.zbfiles = []
        for (var item in res.data.data[0].fj_img) {
          this.setData({ zbfiles: this.data.zbfiles.concat(res.data.data[0].fj_img[item].img_url) })
        }
        break;
      default:
        break;
    }
  },

  xcSign: function (res) {
    if (res.data.code == 0) {
      this.getZbInfo()
      wx.showToast({
        title: res.data.message,
        icon: 'success',
        duration: 3000
      })
    } else {
      wx.showToast({
        title: res.data.message,
        icon: 'warn',
        duration: 3000
      })
    }
  },

  submitKcjl: function (res) {
    if (res.data.code == 0) {
      //返回询价页面
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (res1) {
          // success
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 3000
          })
        }
      })
    } else {
      this.showTopTips(res.data.message)
    }
  },

  // download_zb_file: function (res) {
  //   switch (res.data.code) {
  //     case 0:
  //       wx.downloadFile({
  //         url: res.data.data.url, //仅为示例，并非真实的资源
  //         success: function (res) {
  //           wx.saveFile({
  //             success: function (res) {
  //               var tempFilePath = res.tempFilePath
  //               wx.saveFile({
  //                 tempFilePath: tempFilePath,
  //                 success: function (res) {
  //                   var savedFilePath = res.savedFilePath
  //                 }
  //               })
  //             }
  //           })
  //         }
  //       })
  //       break;
  //     default:
  //       wx.showToast({
  //         title: res.data.message,
  //         icon: 'success',
  //         duration: 1000
  //       })
  //       break;
  //   }
  // }
});