// var app = getApp();
Page({
  data: {
    smrzbz: 0,
    fdcgjsbz: 0,
    tdgjsbz: 0,
    zcpgsbz: 0,
   

  },
  onLoad: function (options) {
  
    this.setData({
      smrzbz: getApp().data.userInfo.scrzbz,
      fdcgjsbz: getApp().data.userInfo.tdgjsbz,
      tdgjsbz: getApp().data.userInfo.tdgjsbz,
      zcpgsbz: getApp().data.userInfo.zcpgsbz,
    })

  },
  tofcpgsTap: function () {
    console.log('ee');
    wx.navigateTo({
      url: '/pages/mine/auth/fcpgs_auth/fcpgs_auth',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {

      }
    })
  },
  totdpgsTap: function () {
    wx.navigateTo({
      url: '/pages/mine/auth/tdpgs_auth/tdpgs_auth',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        console.log('ee');
      }
    })
  },
  tocerTap: function () {

    wx.navigateTo({
      url: '/pages/mine/auth/certification/certification',
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
  }
})