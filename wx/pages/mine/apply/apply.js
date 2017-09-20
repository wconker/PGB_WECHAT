Page({
  data: {
    windowWidth: '',
    gsmt: '',
    yyzz: '',
    files: "",
    files_gs: "",
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({
      gsmt: getApp().data.gsmt,
      files: 'https://www.yiqiyun.org/filepgb/file_img/yyzz.jpg',
      files_gs: 'https://www.yiqiyun.org/filepgb/file_img/gsmc.jpg',
      yyzz: getApp().data.yyzz
    })
  },

  getwidth: function () {
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          windowWidth: res.windowWidth
        })
        console.log(res.windowWidth);
      }
    });
  },
  chooseImage_front: function (e) {
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
          files: temp[0]
        });

        var yyzz = that.data.files;
        // var gsmc = this.data.files_gs;

        var sData_yyzz = {
          "userid": getApp().data.userid,
          "imgtype": encodeURI('营业执照'),
          "fjbs": getApp().data.yyzz
        }
        console.log(sData_yyzz);
        wx.uploadFile({
          url: getApp().data.url,
          filePath: yyzz,
          name: 'file',
          formData: sData_yyzz,
          header: { "content-type": 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data);
          }
        });

      }
    })
  },
  bindOk: function () {
    wx.navigateBack({
      delta: 1,
      success: function (resv) {
        wx.showToast({
          title: "提交成功！",
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  chooseImage_back: function (e) {
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
          files_gs: temp[0]
        });
        //  var yyzz = that.data.files;
        var gsmc = that.data.files_gs;

        var sData_gsmt = {
          "userid": getApp().data.userid,
          "imgtype": encodeURI('公司照片'),
          "fjbs": getApp().data.gsmt
        }

        wx.uploadFile({
          url: getApp().data.url,
          filePath: gsmc,
          name: 'file',
          formData: sData_gsmt,
          header: { "content-type": 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data);
          }
        });
      }
    });
  },

})