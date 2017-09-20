var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
/*投标详情*/
Page({
  data: {
    showTopTips: false,
    tips: "错误提示",
    files: [],
    info: [],
    zbid: 0,
    tbid: 0,
    flag2: 0,
    fromPage: ''
  },

  //接受投标
  bindYes: function (e) {
    if (this.data.info.tbj == 0) {
      var sCmd = { "cmd": "business.selectedtb", "data": { "zbid": this.data.zbid, "tbid": this.data.tbid, "form_id": e.detail.formId } };
      WxNotificationCenter.postNotificationName("send", sCmd);
    } else {
      var sCmd = { "cmd": "user.applyWxZbPay", "data": { "zbid": this.data.zbid, "tbid": this.data.tbid, "total_fee": this.data.info.tbj, "form_id": e.detail.formId } };
      wx.showToast({
        title: "生成支付单",
        icon: 'loading',
        duration: 10000
      })
      WxNotificationCenter.postNotificationName("send", sCmd);
    }

  },
  asses: function () {

    wx.navigateTo({
      url: '/pages/core/assessment/assessment?zbid=' + this.data.info.zbid,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

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

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  bindTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },

  onLoad: function (e) {
    this.setData({ bjid: e.bjid, fromPage: e.fromPage })


    var vTmp
    if (this.data.fromPage == 'myZbList') {
      vTmp = 'getTbInfo'
    } else {
      vTmp = 'getMyTbInfo'
    }
    var sCmd = { "cmd": "business." + vTmp, "data": { "tbid": e.tbid } };
    wx.showToast({
      title: '详情加载中',
      icon: 'loading',
      duration: 10000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getTbInfo", this.getTbInfo, this)
    WxNotificationCenter.addNotification("business.selectedtb", this.selectedtb, this)
    WxNotificationCenter.addNotification("business.getMyTbInfo", this.getMyTbInfo, this)
    WxNotificationCenter.addNotification("user.applyWxZbPay", this.applyWxZbPay, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getTbInfo", this)
    WxNotificationCenter.removeNotification("business.selectedtb", this)
    WxNotificationCenter.removeNotification("business.getMyTbInfo", this)
    WxNotificationCenter.removeNotification("user.applyWxZbPay", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getTbInfo", this)
    WxNotificationCenter.removeNotification("business.selectedtb", this)
    WxNotificationCenter.removeNotification("business.getMyTbInfo", this)
    WxNotificationCenter.removeNotification("user.applyWxZbPay", this)
  },

  getTbInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        this.setData({ zbid: res.data.data[0].zbid })
        this.setData({ tbid: res.data.data[0].tbid })
        //处理附件
        for (var item in res.data.data[0].fj_img) {
          this.setData({ files: this.data.files.concat(res.data.data[0].fj_img[item].img_url) })
        }
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

  //确认中标 支付
  applyWxZbPay: function (res) {
    wx.hideToast()
    switch (res.data.code) {
      case 0:
        wx.requestPayment({
          'appId': res.data.data.appId,
          'timeStamp': (res.data.data.timeStamp).toString(),
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.package,
          'signType': 'MD5',
          'paySign': res.data.data.paySign,
          'success': function (respay) {
            wx.showToast({
              title: "支付成功",
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          },
          'fail': function (respay) {
            console.log(respay)
            wx.showToast({
              title: "支付失败",
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 3000
        })
        break;
    }
  },

  getMyTbInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        this.setData({ zbid: res.data.data[0].zbid })
        this.setData({ tbid: res.data.data[0].tbid })
        //处理附件
        for (var item in res.data.data[0].fj_img) {
          this.setData({ files: this.data.files.concat(res.data.data[0].fj_img[item].img_url) })
        }
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

  selectedtb: function (res) {
    switch (res.data.code) {
      case 0:
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
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 3000
        })
        break;
    }
  }
});