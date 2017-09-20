/*查勘记录*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    showTopTips: false,
    tips: "",
    files: [],
    bdw: '',
    zbid: 0,
    canel: 1,
    record: [],
    recordIndex: 0,
    scrollTop: 0,
    kcnum: 0,
    yxnum: 0,
    formPage: ''
  },

  //conker  设置回到顶部方法， 发现设置scroll-top值不能和上一次的值一样，否则无效，所以这里加了个判断  
  goTopFun: function (e) {
    var _top = this.data.scrollTop.scroll_top;
    if (_top == 1) {
      _top = 5;
    } else {
      _top = 1;
    }
    this.setData({
      'scrollTop': _top
    });

  },

  //conker 关闭上方提示
  canel: function () {

    this.setData({
      canel: 0
    })
  },
  chooseImage: function (e) {

    var that = this;
    var sData
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

     
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        for (var i in res.tempFilePaths) {
          var sVar = 'record[' + e.currentTarget.id + '].files'
          var sValue = Array()
          var oItem = [{ id: "0", img_url: res.tempFilePaths[i] }]
          sValue = that.data.record[e.currentTarget.id].files.concat(oItem)
            
          that.setData({ [`${sVar}`]: sValue })
          console.log(sValue)

          var _ID
          //上传附件
          if (that.data.formPage == 'ckbInfo') {
            _ID = "ckid"
          } else {
            _ID = "zbid"
          } 
          
          console.log(res.tempFilePaths[i],"ee",getApp().data.url);
          sData = {
            "userid": getApp().data.userid,
            "imgtype": "查勘记录",
            "imgname": "",
            "fileindex": that.data.record[e.currentTarget.id].files.length,
            "fjbs": that.data.record[e.currentTarget.id].sjxz,
            [`${_ID}`]: that.data.zbid,
          }

          wx.uploadFile({
            url: getApp().data.url,
            filePath: res.tempFilePaths[i],
            name: 'file',
            formData: sData,
            success: function (res2) {
              //todo.. 将IP写到record[x].files[y].id
              console.log('upload file')
              console.log(res2)
              var fileid = JSON.parse(res2.data)
              console.log(fileid)
              if (fileid.code == 0) {
                var j = fileid.data.fileindex - 1
                var sVar = 'record[' + e.currentTarget.id + '].files[' + j + '].id'
                var sValue = fileid.data.id
                console.log(sVar)
                console.log(sValue)
                that.setData({ [`${sVar}`]: sValue })
              }
            }
          })
        }
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    var that = this
    //console.log(e)
    var urlLists = Array()
    console.log(that.data.record[e.currentTarget.dataset.id].files[0].img_url)
    for (var item in that.data.record[e.currentTarget.dataset.id].files) {
      urlLists.push(that.data.record[e.currentTarget.dataset.id].files[item].img_url)
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: urlLists // 需要预览的图片http链接列表
    })
  },
  //删除图片
  deleteImage: function (e) {
    var recordindex = e.currentTarget.id

    console.log(e);
    var sVar = 'record[' + recordindex + '].files'
    var sValue = this.data.record[recordindex].files
    // sValue.splice(e.currentTarget.dataset.id, 1)
    this.setData({ [`${sVar}`]: sValue })
    //删除附件recordindex

    var sCmd = { "cmd": "business.del_ftpimg", "data": { "id": e.currentTarget.id } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  bindOk: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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


  bindChange: function (e) {
    this.updateKcjl(e.currentTarget.id, e.detail.value)
  },

  bindDateChange: function (e) {
    console.log(e)
    var sVar = 'record[' + e.currentTarget.id + '].sjxz'
    this.setData({ [`${sVar}`]: e.detail.value })
    this.updateKcjl(this.data.record[e.currentTarget.id].sjxmc, this.data.record[e.currentTarget.id].sjxz)
  },

  //更新查勘记录
  updateKcjl: function (sjxmc, sjxz) {
    var vCmd
    if (this.data.formPage == 'ckbInfo') {
      vCmd = "updateKcjl_to"
    } else {
      vCmd = "updateKcjl"
    }
    var sCmd = {
      "cmd": "business." + vCmd,
      "data": {
        "zbid": this.data.zbid,
        "sjxmc": sjxmc,
        "sjxz": sjxz
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  onLoad: function (e) {


    this.setData({ zbid: e.zbid, bdw: e.bdw, formPage: e.formPage })

    var sCmd
    if (e.formPage == 'ckbInfo') {
      sCmd = { "cmd": "business.getKcjlList_to", "data": { "id": this.data.zbid } };
    } else {
      sCmd = { "cmd": "business.getKcjlList", "data": { "zbid": this.data.zbid } };
    }

    wx.showToast({
      title: '记录信息加载中',
      icon: 'loading',
      duration: 10000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  //打开单选页面
  bindSelectS: function (e) {
    this.data.recordIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selects/selects?bt=' + e.currentTarget.dataset.bt + '&options=' + e.currentTarget.dataset.options,
    })
  },

  //打开多选页面
  bindSelectM: function (e) {
    this.data.recordIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selectm/selectm?bt=' + e.currentTarget.dataset.bt + '&options=' + e.currentTarget.dataset.options,
    })
  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getKcjlList", this.getKcjlList, this)
    WxNotificationCenter.addNotification("business.del_ftpimg", this.del_ftpimg, this)
    WxNotificationCenter.addNotification("business.updateKcjl", this.updateKCJL, this)
    WxNotificationCenter.addNotification("business.getKcjlList_to", this.getKcjlList, this)
    WxNotificationCenter.addNotification("business.updateKcjl_to", this.updateKCJL, this)
    var index = this.data.recordIndex
    if (index > 0 && getApp().data.select != '!!!') {
      var sVar = 'record[' + index + '].sjxz'
      this.setData({ [`${sVar}`]: getApp().data.select })
      this.updateKcjl(this.data.record[index].sjxmc, this.data.record[index].sjxz)
      this.data.recordIndex = 0
    }
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("business.getKcjlList", this)
    WxNotificationCenter.removeNotification("business.del_ftpimg", this)
    WxNotificationCenter.removeNotification("business.updateKcjl", this)
    WxNotificationCenter.removeNotification("business.getKcjlList_to", this)
    WxNotificationCenter.removeNotification("business.updateKcjl_to", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getKcjlList", this)
    WxNotificationCenter.removeNotification("business.del_ftpimg", this)
    WxNotificationCenter.removeNotification("business.updateKcjl", this)
    WxNotificationCenter.removeNotification("business.getKcjlList_to", this)
    WxNotificationCenter.removeNotification("business.updateKcjl_to", this)
  },


  //取查勘记录
  getKcjlList: function (res) {
    setTimeout(function () {
      wx.hideToast()
    }, 500)
    switch (res.data.code) {
      case 0:
        this.setData({ record: res.data.data })

        //conker 
        this.setData({ kcnum: res.data.data[0].kcnum, yxnum: res.data.data[0].yxnum });

        this.setData({
          sHeight: res.windowHeight - 550,
        });
        break;
      default:
        break;
    }
  },

  //删除图片
  del_ftpimg: function (res) {
    switch (res.data.code) {
      case 0:
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 3000
        })
        break;
    }
    if (res.data.code != 0)
      wx.showToast({
        title: res.data.message,
        icon: 'warn',
        duration: 3000
      })
  },

  //更新查勘记录
  updateKCJL: function (res) {


    if (res.data.code == 0) {
      this.setData({ kcnum: res.data.data.kcnum, yxnum: res.data.data.yxnum });
    }
    if (res.data.code != 0)
      wx.showToast({
        title: res.data.message,
        icon: 'warn',
        duration: 2000
      })
  },
});