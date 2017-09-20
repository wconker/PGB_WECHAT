var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    tips: "",
    files: [],
    info: [],
    bjid: 0,
    flag2: 0,
    fromPage: '',
    lhflag: -1,
  
  
    downimg: '/images/down.png'
  },

  //接受报价
  bindYes: function () {
    var sCmd = { "cmd": "business.acceptBj", "data": { "bjid": this.data.bjid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  //拒绝报价
  bindNo: function () {
    var sCmd = { "cmd": "business.rejectBj", "data": { "bjid": this.data.bjid } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  down: function () {


    if (this.data.lhflag == 0) {
      var sCmd = { "cmd": "business.pullBlack_bj", "data": { "lhflag": 1, "bjid": this.data.bjid } };
      WxNotificationCenter.postNotificationName("send", sCmd);

      this.setdown(1);
    }
    else {
      var sCmd = { "cmd": "business.pullBlack_bj", "data": { "lhflag": 0, "bjid": this.data.bjid } };
      WxNotificationCenter.postNotificationName("send", sCmd);
      this.setdown(0);
    }

  },
  setdown: function (lhflag) {
    if (lhflag == 1) {
      this.setData({
        downimg: '/images/cry.png',
        comm: '不满意！'
      })
    }
    else {
      this.setData({
        downimg: '/images/nomal.jpg',
        comm: '不满意点我'
      })
    }

  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  showTopTips: function (s) {
    this.setData({
      tips: s,
      showTopTips: true,
    });
    setTimeout(function () {
      this.setData({
        showTopTips: false
      });
    }, 3000);
  },

  bindTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id
    })
  },

  onLoad: function (e) {

    this.setData({ bjid: e.bjid, fromPage: e.fromPage })
    var vTmp = 'getbjInfo'

    if (this.data.fromPage == 'myXjList') {
      vTmp = 'getbjInfo'
    } else {
      vTmp = 'getMybjInfo'
    }
    var sCmd = { "cmd": "business." + vTmp, "data": { "bjid": e.bjid } };
    wx.showToast({
      title: '详情加载中',
      icon: 'loading',
      duration: 10000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  pullBlack_bj: function (res) {

    if (res.data.code == 0) {
      var flag = Math.abs(this.data.lhflag - 1);
      this.setData({ lhflag: flag })
    }
  },
  onShow: function () {
    WxNotificationCenter.addNotification("business.getbjInfo", this.getbjInfo, this)
    WxNotificationCenter.addNotification("business.pullBlack_bj", this.pullBlack_bj, this)
    WxNotificationCenter.addNotification("business.getMybjInfo", this.getMybjInfo, this)
    WxNotificationCenter.addNotification("business.acceptBj", this.acceptBj, this)
    WxNotificationCenter.addNotification("business.rejectBj", this.rejectBj, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getbjInfo", this)
    WxNotificationCenter.removeNotification("business.getMybjInfo", this)
    WxNotificationCenter.removeNotification("business.acceptBj", this)
    WxNotificationCenter.removeNotification("business.rejectBj", this)
    WxNotificationCenter.removeNotification("business.pullBlack_bj", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getbjInfo", this)
    WxNotificationCenter.removeNotification("business.getMybjInfo", this)
    WxNotificationCenter.removeNotification("business.acceptBj", this)
    WxNotificationCenter.removeNotification("business.rejectBj", this)
  },

  getMybjInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    console.log(res);
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        for (var item in res.data.data[0].fj_img[0]) {
          this.setData({ files: this.data.files.concat(res.data.data[0].fj_img[0][item].fj_img) })

        }

        console.log(this.data.files);
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 1000
        })
        break;
    }

  },

  getbjInfo: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ info: res.data.data[0] })
        console.log(res.data.data[0])
        for (var item in res.data.data[0].fj_img) {
          this.setData({ lhflag: res.data.data[0].lhflag, files: this.data.files.concat(res.data.data[0].fj_img[item].img_url) })
        }
        this.setData({ lhflag: res.data.data[0].lhflag })
        this.setdown(res.data.data[0].lhflag);

        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'fail',
          duration: 1000
        })
        break;
    }
  },

  acceptBj: function (res) {
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

  rejectBj: function (res) {
    if (res.data.code == 0) {
      //返回询价页面
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
        success: function (res) {
          // success
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
        }
      })
    } else {
      this.showTopTips(res.data.message)
    }
  }
});