var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var app = getApp();
Page({
  data: {
    userInfo: {},
    files: '',
    gsmc: '',
    imgflag: 0,
    user: {},
    checked:true,
    //内部成员
    member: 0,
    x_menus: [
      { title: '充值', icon: '/images/icon_recharge.png' },
      { title: '提现', icon: '/images/icon_cash.png', classes: 'two_side' },
      { title: '设置', icon: '/images/icon_set.png' },
    ],
    smsflag: 0

  },
  bindimage: function () {
    var pageUrl = '/pages/mine/person/person';
    wx.navigateTo({
      url: pageUrl
    })
  },
  map: function () {
    wx.navigateTo({
      url: '/pages/mine/map/map'
    })
  },
  tofastauth: function () {
    wx.navigateTo({
      url: '/pages/mine/person/person'
    })
  },
  gobindemail: function (e) {
    wx.navigateTo({
      url: '/pages/mine/bindinfo/bindinfo?witch=1',
    })
  },
  gobindphone: function (e) {

    wx.navigateTo({
      url: '/pages/mine/bindinfo/bindinfo?witch=2',
    })
  },
  gobindgsmc: function (e) {

    wx.navigateTo({
      url: '/pages/mine/bindinfo/bindinfo?witch=3',
    })
  },

  gomanager: function () {
    wx.navigateTo({
      url: '/pages/mine/manager/list/list',
    })
  },
  share: function (e) {

    this.onShareAppMessage();

  },
  service: function (e) {
    wx.navigateTo({
      url: '/pages/mine/service/service',

    })
  },
  adminMgmt: function (e) {
    wx.navigateTo({
      url: '/pages/mine/adminMgmt/adminMgmt',

    })
  },
  bill: function () {
    wx.navigateTo({
      url: '/pages/core/billList/billList?fromPage=bill'
    })
  },

  getbill: function () {
    wx.navigateTo({
      url: '/pages/core/billList/billList?fromPage=getbill'
    })
  },
  gobindmoney: function (res) {
    wx.navigateTo({
      url: '/pages/core/billList/billList?fromPage=gobindmoney'
    })
  },

  tofcpgsTap: function () {
    if (this.data.userInfo.fdcgjsbz > 0) return
    wx.navigateTo({
      url: '/pages/mine/auth/fcpgs_auth/fcpgs_auth',

    })
  },

  totdpgsTap: function () {
    if (this.data.userInfo.tdgjsbz > 0) return
    wx.navigateTo({
      url: '/pages/mine/auth/tdpgs_auth/tdpgs_auth',
    })
  },
  tocerTap: function () {
    if (this.data.userInfo.scrzbz > 0) return
    wx.navigateTo({
      url: '/pages/mine/auth/certification/certification'
    })
  },

  bindMenuTap: function (event) {
    switch (event.currentTarget.id) {
      case '充值':
        var pageUrl;
        pageUrl = '/pages/mine/pay/pay';
        wx.navigateTo({
          url: pageUrl
        })
        break;
      case '提现':
        console.log('提现')
        var pageUrl;
        pageUrl = '/pages/mine/withdraw/withdraw';
        wx.navigateTo({
          url: pageUrl
        })
        // case '评估':
        break;
      case "设置":
        var pageUrl = '/pages/mine/setting/setting?smsflag=' + this.data.smsflag;
        wx.navigateTo({
          url: pageUrl
        })
        break;
    }
  },
  aaplytome: function () {
    wx.navigateTo({
      url: '/pages/mine/applytome/applytome',
    })
  },
  rzTap: function (event) {
    wx.navigateTo({
      url: '/pages/mine/auth/list/list',
    })
  },
  bindUserAgree: function () {
    wx.navigateTo({
      url: '/pages/mine/agree/agree',
    })
  },
  onLoad: function (options) {
    this.setData({ userInfo: app.data.userInfo })
    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onShow: function () {
    //conker 判断是否管理员
    WxNotificationCenter.addNotification("user.getUserinfo", this.getUserinfo, this);
    WxNotificationCenter.addNotification("user.isShow", this.isShow, this)
    if (getApp().data.user.adminflag == 1) {
      this.setData({ member: 1 });
    }
    else {
      this.setData({ member: 0 });
    }
    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  
  },

  stateforswitch:function(){
    if (this.data.userInfo.isshow == "1") {
      this.setData({
        checked:true
      })
    } else {
      this.setData({
        checked: false
      })
    }
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
  },

  bindMyPos: function () {
    var isS;
    if (this.data.userInfo.isshow=="1"){
      isS=0;
    }else{
      isS=1;
    }
     var sCmd = { "cmd": "user.isShow", "data": { "isshow": isS } };
     WxNotificationCenter.postNotificationName("send", sCmd);
  },
  isShow:function(res){
    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  getUserinfo: function (res) {
    wx.stopPullDownRefresh()
    var that = this
    switch (res.data.code) {
      case 0:

        //设置显示头像
        this.setUserHeaderImage(res)
        getApp().data.user = res.data.data[0];
        getApp().data.email = res.data.data[0].dzyx;
        getApp().data.smsflag = res.data.data[0].smsflag;
        this.setData({
          smsflag: res.data.data[0].smsflag,
          user: res.data.data[0],
          gsmc: res.data.data[0].gsmc.length > 10 ? res.data.data[0].gsmc.substring(0, 8) + '...' : res.data.data[0].gsmc,
          userInfo: res.data.data[0]
        });
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        break;
    }
    this.stateforswitch();
  },

  //设置头像
  setUserHeaderImage: function (res) {
    var that = this
    wx.getStorage({
      key: 'headerImageMD5',
      success: function (res_headerImageMd5) {
        if (res_headerImageMd5.data != res.data.data[0].tx_md5) {
          try {
            that.setData({ files: res.data.data[0].tx_img })
            wx.setStorageSync('headerImageMD5', res.data.data[0].tx_md5)
            that.saveHeaderImage(res)
          } catch (e) {
          }
        } else {
          wx.getStorage({
            key: 'headerImg',
            success: function (res_img) {
              console.log("res_img", res_img.data)
              that.setData({ files: res_img.data })
            },
            fail: function () {
              that.setData({ files: res.data.data[0].tx_img })
              that.saveHeaderImage(res)
            }
          })
        }
      }, fail: function () {
        wx.setStorage({
          key: 'headerImageMD5',
          data: res.data.data[0].tx_md5
        })
        that.setData({ files: res.data.data[0].tx_img })
        that.saveHeaderImage(res)
      }
    })
  },

  //保存头像
  saveHeaderImage: function (res) {
    var that = this
    wx.downloadFile({
      url: res.data.data[0].tx_img, //仅为示例，并非真实的资源
      success: function (res_down) {

        wx.getStorage({
          key: 'headerImg',
          success: function (res_img) {
            wx.setStorageSync('headerImg', res_down.tempFilePath)
          },
          fail: function () {
            wx.setStorage({
              key: 'headerImg',
              data: res_down.tempFilePath
            })
          }
        })
      }, fail: function () {
        wx.setStorage({
          key: 'headerImageMD5',
          data: ''
        })
      }
    })
  },

  onPullDownRefresh: function () {
    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    wx.showToast({
      title: ' 刷新个人信息中 ',
      icon: 'loading',
      duration: 1000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);
  }

})