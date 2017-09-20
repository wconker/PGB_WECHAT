var WxNotificationCenter = require("../../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    windowWidth: 0,
    files: "",
    imgUpMsg: "",
    fdcpgs: "",
    rotate: 0,
    user: {},
    hidden: true,

  },
  agree: function () {
    wx.navigateTo({
      url: '/pages/mine/agree/agree',

    })
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  rotate: function (e) {
    var v = 0;
    if (e.detail.value) {
      v = 0;

    } else {
      v = 1;
    }
    this.setData({
      rotate: v
    })
  },


  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          windowWidth: res.windowWidth

        })
        console.log(res.windowWidth);
      }
    });

    var sCmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onShow: function () {
    WxNotificationCenter.addNotification("user.getUserinfo", this.getUserinfo, this)
    WxNotificationCenter.addNotification("user.Qualification", this.Qualification, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
    WxNotificationCenter.removeNotification("user.Qualification", this)

  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
    WxNotificationCenter.removeNotification("user.Qualification", this)
  },

  chooseImage_front: function (e) {
    var that = this;
    if (getApp().data.user.fdcgjsbz == 2) {
      wx.showToast({
        title: "认证已通过！",
        icon: 'success',
        duration: 1500
      });
      return;
    }
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
        var sData = {
          "userid": getApp().data.userid,
          "imgtype": encodeURI('房地产估价师资格证'),
          "sign": getApp().data.sign,
        }
        wx.uploadFile({
          url: getApp().data.url,
          filePath: temp[0],
          name: 'file',
          formData: sData,
          header: { "content-type": 'application/x-www-form-urlencoded' },
          success: function (res) {
            that.setData({
              "imgUpMsg": res.errMsg
            })
          },
          fail: function (res) {
            that.setData({
              "imgUpMsg": res.errMsg
            });
            console.log("fail", res);
          }
        })
      }
    })
  },


  setfdczch: function (ev) {
    var me = this;
    me.setData(
      {
        fdcpgs: ev.detail.value
      }
    )
  },

  bindOk: function (ev) {
    var sCmd = { "cmd": "user.Qualification", "data": { "rzlx": 1, "fdcgjszch": this.data.fdcpgs, "form_id": ev.detail.formId } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },



  getUserinfo: function (res) {

    console.log(res.data.data[0].fc_img);
    switch (res.data.code) {
      case 0:
        this.setData({
          files: res.data.data[0].fc_img == "" ? 'https://www.yiqiyun.org/filepgb/file_img/fc.jpg' : res.data.data[0].fc_img,
          fdcpgs: res.data.data[0].fdcgjszch,
          user: res.data.data[0]
        })
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

  Qualification: function (res) {
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
            // var sCmd = { "cmd": "user.getUserinfo", "data": {} };
            // WxNotificationCenter.postNotificationName("send", sCmd);
          }
        })
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