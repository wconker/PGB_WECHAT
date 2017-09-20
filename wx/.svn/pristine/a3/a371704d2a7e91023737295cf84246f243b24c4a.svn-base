var app = getApp();
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    isChecked: false
  },
  onLoad: function (options) {
    this.setData({isChecked:options.smsflag==1?true:false})
    WxNotificationCenter.addNotification("user.setSmsflag", this.setSmsflag, this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.setSmsflag", this)
  },

  setSmsflag:function(res){

  },

  switchChange: function (e) {
    this.setData({ isChecked: e.detail.value })
    var Smessage
    if (e.detail.value) {
      Smessage = "已开启新消息提示音"
    } else {
      Smessage = "已关闭新消息提示音"
    }
    wx.showToast({
      title: Smessage,
      icon: 'success',
      duration: 2000
    })

    var sCmd = {
      "cmd": "user.setSmsflag",
      "data": {
        smsflag: this.isChecked ? 1 : 0
      }
    };

    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  person: function (event) {


    wx.navigateTo({
      url: '/pages/mine/person/person',
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


  cleanSpace: function (res) {

    wx.showModal({
      title: '提示',
      content: '是否清空储存空间',
      success: function (res) {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
            wx.getSavedFileList({
              success: function (res) {
                if (res.fileList.length > 0) {
                  wx.removeSavedFile({
                    filePath: res.fileList[0].filePath,
                    success: function () {
                      wx.showToast({
                        title: '清理空间成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }, fail: function () {
                      wx.showToast({
                        title: '清理空间失败',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                }
              }
            })
          } catch (e) {
            wx.showToast({
              title: '清理空间失败',
              icon: 'success',
              duration: 2000
            })
          }
        }
      }
    })


  }
})