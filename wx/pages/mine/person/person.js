var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var app = getApp();
Page({
  data: {
    jgmc: '',
    nc: '',
    xm: "",
    fczch: "",
    zczch: "",
    userInfo: {},
    comp: '',
    user: {},
    citys: {},
    files: "",
    phone: '',
    warn: 0,
    tdzch: "",
    qm: ''
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.data.user = app.data.user
    console.log(this.data.user)
    // var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    // WxNotificationCenter.postNotificationName("send", sCmd);
    this.setData({
      userInfo: this.data.user,
      jgmc: this.data.user.gsmc,
      nc: this.data.user.nc,
      xm: this.data.user.xm,
      fczch: this.data.user.fdcgjszch,
      files: this.data.user.tx_img,
      qm: this.data.user.qm
      // ifshow_sm: this.data.user.scrzbz < 1 ? 'true' : 'false',
      //   ifshow_fc: this.data.user.fdcgjszch < 1 ? 'true' : 'false',
    });
  },
  //选择公司
  chooseCompany: function () {
    wx.navigateTo({
      url: '/pages/core/selectcomp/selectcomp',
    })
  },

  settdzch: function (e) {
    this.setData({
      tdzch: e.detail.value
    })


  },

  //验证手机号码
  checkPhone: function (phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false
    } else {
      return true;
    }
  },

  setSJHM: function (e) {
    if (!this.checkPhone(e.detail.value)) {
      this.setData({ warn: 1 })
    } else {
      this.setData({ warn: 0 })
    }
    this.setData({ phone: e.detail.value });
  },
  goselectcomp: function () {

    wx.navigateTo({
      url: '/pages/core/selectcomp/selectcomp',
    })
  },

  choseCity: function (e) {
    this.data.recordIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selectcity/selectcity'
    })
  },

  onShow: function () {
    // 生命周期函数--监听页面显示
    WxNotificationCenter.addNotification("user.updateSign", this.updateSign, this)
    WxNotificationCenter.addNotification("user.Certification", this.Certification, this)
    console.log(getApp().data.jgmc, "9999");
    if (getApp().data.jgmc != "!!!" & getApp().data.jgmc != ""){
    this.setData({
      jgmc: getApp().data.jgmc
    });
   }
  

    //城市选择的返回
    if (getApp().data.city != "!!!") {
      this.setData({ citys: getApp().data.city });
    }
    getApp().data.city = "!!!";
    getApp().data.jgmc="!!!";

  },
  onHide: function () {
    WxNotificationCenter.removeNotification("user.updateSign", this)
    WxNotificationCenter.removeNotification("user.Certification", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.updateSign", this)
    WxNotificationCenter.removeNotification("user.Certification", this)
  },

  onPullDownRefresh: function () {
    // 生命周期函数--监听页面加载
    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  upQM: function () {

    var sCmd = {
      "cmd": "user.updateSign",
      "data": {
        "userid": getApp().data.userid,
        "sign": getApp().data.sign,
        "qm": this.data.qm
      }
    };

    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var temp = [];
        temp.push(res.tempFilePaths.length > 1 ? res.tempFilePaths[res.tempFilePaths.length - 1] : res.tempFilePaths[0]);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: temp
        });
      }
    });
  },

  setxm: function (e) {
    this.setData({
      xm: e.detail.value
    })
  },
  setfczch: function (e) {
    this.setData({
      fczch: e.detail.value
    })

  },
  qmBindblur: function (e) {
    console.log(e.detail.value);

    this.setData({
      qm: e.detail.value
    })


  },
  //setup touxiang and nickname
  setnc: function (e) {
    this.setData({
      nc: e.detail.value
    })
  },

  bindOk: function (e) {
    console.log('快速认证提交')
    var me = this;
    var sData = {
      "userid": getApp().data.userid,
      "imgtype": encodeURI('头像'),
      "form_id": e.detail.formId
    }

    // if (this.data.files.length == 1) {
    //   console.log('上传文件')
    //   wx.uploadFile({
    //     url: getApp().data.url,
    //     filePath: this.data.files[0],
    //     name: 'file',
    //     formData: sData,
    //     success: function (re) {
    //       console.log('re', re);
    //     }, fail: function (re) {
    //       console.log('fail', re);
    //     }
    //   })
    // }


    var sCmd = {
      "cmd": "user.Certification",
      "data": {
        "userid": getApp().data.userid,
        "sign": getApp().data.sign,
        "gsmc": this.data.jgmc,
        "xm": this.data.xm,
        "qm": this.data.qm
      }
    };
    console.log("maomao:", sCmd)
    WxNotificationCenter.postNotificationName("send", sCmd);
  },


  // getUserinfo: function (res) {
  //   var me = this;
  //   switch (res.data.code) {
  //     case 0:
  //       console.log(res)
  //       this.setData({
  //         userInfo: me.data.user,
  //         jgmc: me.data.user.gsmc,
  //         nc: me.data.user.nc,
  //         xm: me.data.user.xm,
  //         files: me.data.user.tx_img,

  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // },

  //------------------签名回调---------------
  updateSign: function (res) {

    if (res.data.code == 0) {
      wx.showToast({
        title: '签名已保存',
      })

    } else {
      wx.showToast({
        title: res.data.message,
      })
    }
  },
  Certification: function (res) {


    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1,
          success: function () {
  
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })

    }
  }
})


var factory = require("../../../utils/Factory.js");//辅助类