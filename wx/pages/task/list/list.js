/*查勘*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["招标中", "我的招标", "我的投标", "我的任务"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    sHeight: 0,
    zbList: [],
    myzbList: [],
    mytbList: [],
    myTaskList: [],
    hidden: true,
    nocancel: true,
    email: '',
    _ID: 0,
    local: '',

    zbzPage: 1,
    wdzbPage: 1,
    wdtbPage: 1,
    wdrwPage: 1
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          sHeight: res.windowHeight,
        });
      }
    });
  },
  getpostionCity: function () {
    //获取定位地址
    WxNotificationCenter.addNotification("business.getYwCity", this.getYwCity, this)
    var sCmd = { "cmd": "business.getYwCity", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  setpostionCity: function (valuedqdm) {
    //设置定位地址
    var sCmd = { "cmd": "business.setYwCity", "data": { dqdm: valuedqdm } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  changeCity: function (e) {
    wx.navigateTo({
      url: '/pages/core/selectcity/selectcity'
    })

  },

  setYwCity: function (res) {
    //设置定位地址回调
    if (res.data.code == 0) {
      this.getpostionCity();


      var sCmd = { "cmd": "business.getZbList", "data": {} };
      WxNotificationCenter.postNotificationName("send", sCmd);
    }




  },

  getYwCity: function (res) {
    //获取定位地址回调
    this.setData({ local: res.data.data[0].dqmc });
    console.log(res, 'getYwCity');
    WxNotificationCenter.removeNotification("business.getYwCity", this)
  },

  onShow: function () {
    WxNotificationCenter.addNotification("business.getZbList", this.getZbList, this)
    WxNotificationCenter.addNotification("business.getMyZbList", this.getMyZbList, this)
    WxNotificationCenter.addNotification("business.getMytbList", this.getMytbList, this)
    WxNotificationCenter.addNotification("business.getMyTaskList", this.getMyTaskList, this)
    WxNotificationCenter.addNotification("business.closeZb", this.closeZb, this)
    WxNotificationCenter.addNotification("business.endZb", this.endZb, this)
    WxNotificationCenter.addNotification("business.download_zb_file", this.download_zb_file, this)
    WxNotificationCenter.addNotification("business.AgainSendEmail_kcfile", this.AgainSendEmail_kcfile, this)

    WxNotificationCenter.addNotification("business.setYwCity", this.setYwCity, this)

    this.reloadData();
    console.log(getApp().data.city);
    if (getApp().data.city != "!!!" && getApp().judge(getApp().data.city)) {
      this.setpostionCity(getApp().data.city.dqdm)
    }
    this.getpostionCity();
    getApp().data.city = "!!!";

    if (!getApp().judge(this.data.citys)) {
      this.setData({ citys: getApp().data.local });
    }

  },
  onHide: function () {
    WxNotificationCenter.removeNotification("business.getZbList", this)
    WxNotificationCenter.removeNotification("business.getMyZbList", this)
    WxNotificationCenter.removeNotification("business.getMytbList", this)
    WxNotificationCenter.removeNotification("business.getMyTaskList", this)
    WxNotificationCenter.removeNotification("business.closeZb", this)
    WxNotificationCenter.removeNotification("business.endZb", this)
    WxNotificationCenter.removeNotification("business.download_zb_file", this)
    WxNotificationCenter.removeNotification("business.AgainSendEmail_kcfile", this)
    WxNotificationCenter.removeNotification("business.getYwCity", this)
    WxNotificationCenter.removeNotification("business.setYwCity", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("business.getZbList", this)
    WxNotificationCenter.removeNotification("business.getMyZbList", this)
    WxNotificationCenter.removeNotification("business.getMytbList", this)
    WxNotificationCenter.removeNotification("business.getMyTaskList", this)
    WxNotificationCenter.removeNotification("business.closeZb", this)
    WxNotificationCenter.removeNotification("business.endZb", this)
    WxNotificationCenter.removeNotification("business.download_zb_file", this)
    WxNotificationCenter.removeNotification("business.AgainSendEmail_kcfile", this)
    WxNotificationCenter.removeNotification("business.getYwCity", this)
    WxNotificationCenter.removeNotification("business.setYwCity", this)
  },

  reloadData: function () {
    var sCmd = ""
    switch (this.data.activeIndex) {
      case "0":     //招标中
        this.setData({ zbzPage: 1 })
        sCmd = { "cmd": "business.getZbList", "data": {} };
        break;
      case "1":     //我的招标
        this.setData({ wdzbPage: 1 })
        sCmd = { "cmd": "business.getMyZbList", "data": {} };
        break;
      case "2":     //我的投标
        this.setData({ wdtbPage: 1 })
        sCmd = { "cmd": "business.getMytbList", "data": {} };
        break;
      case "3":     //我的任务
        this.setData({ wdrwPage: 1 })
        sCmd = { "cmd": "business.getMyTaskList", "data": {} };
        break;
    }

    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.reloadData()
  },

  updownTask: function (e) {
    var sCmd = { "cmd": "business.download_zb_file", "data": { "zbid": e.target.id, } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  sendTask: function (e) {
    var _email
    try {
      var value = wx.getStorageSync('email')
      console.log(value)
      if (value) {
        _email = value
      } else {
        _email = getApp().data.email
      }
    } catch (e) {
      _email = getApp().data.email
    }
    this.setData({ hidden: false, nocancel: false, _ID: e.target.id, email: _email })
  },

  //发起招标
  bindNew: function (event) {
    var pageUrl;
    pageUrl = '/pages/task/new/new';
    wx.navigateTo({
      url: pageUrl
    })
  },


  //查勘工具
  bindMyrecord: function (event) {
    var pageUrl;
    pageUrl = '/pages/task/myrecord/myrecord';
    wx.navigateTo({
      url: pageUrl
    })
  },

  //结案
  bindCloseZb: function (e) {
    var sCmd = { "cmd": "business.closeZb", "data": { "zbid": e.target.id, "form_id": e.detail.formId } };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  //终止招标
  bindEndZb: function (e) {

    wx.showModal({
      title: '提示',
      content: '确定终止招标？',
      success: function (res) {
        if (res.confirm) {
          var sCmd = {
            "cmd": "business.endZb", "data": {
              "zbid": e.detail.target.id,
              "form_id": e.detail.formId
            }
          };
          console.log("eeeeeeee", e.detail.target.id);

          WxNotificationCenter.postNotificationName("send", sCmd);
        }
      }
    });
  },

  //查看招标详情
  bindDetail: function (event) {
    var pageUrl;
    //conker 
    pageUrl = '/pages/task/detail/detail?zbid=' + event.currentTarget.id;
    wx.navigateTo({
      url: pageUrl
    })
  },

  bindMyTbDetail: function (event) {
    var pageUrl;
    //conker 
    pageUrl = '/pages/task/detail/detail?zbid=' + event.currentTarget.id + "&fromPage=tbPerson";
    wx.navigateTo({
      url: pageUrl
    })
  },

  bindMyDetail: function (event) {
    var pageUrl;
    pageUrl = '/pages/task/detail/detail?zbid=' + event.currentTarget.id + '&fromPage=myZbInfo';
    wx.navigateTo({
      url: pageUrl
    })
  },

  //查看投标详情
  bindAnswerDetail: function (event) {
    var pageUrl;

    pageUrl = '/pages/task/answerdetail/answerdetail?tbid=' + event.currentTarget.id;
    wx.navigateTo({
      url: pageUrl
    })
  },

  //查看任务
  bindTask: function (event) {
    var pageUrl;
    pageUrl = '/pages/task/task/task?zbid=' + event.currentTarget.id;
    wx.navigateTo({
      url: pageUrl
    })
  },

  //取招标列表
  getZbList: function (res) {
    wx.stopPullDownRefresh()
    switch (res.data.code) {
      case 0:
        if (this.data.zbzPage == 1) {
          this.setData({ zbList: res.data.data })
        } else {
          var zbList = this.data.zbList
          if (res.data.data.length == 0) {
            this.showToast()
          } else {
            for (var item in res.data.data) {
              zbList.push(res.data.data[item])
            }
            this.setData({ zbList: zbList })
          }
        }
        break;
      default:
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'fail',
        //   duration: 2000
        // })
        break;
    }
  },

  //我的招标
  getMyZbList: function (res) {
    wx.stopPullDownRefresh()
    switch (res.data.code) {
      case 0:
        if (this.data.wdzbPage == 1) {
          this.setData({ myzbList: res.data.data })
        } else {
          var myzbList = this.data.myzbList
          if (res.data.data.length == 0) {
            this.showToast()
          } else {
            for (var item in res.data.data) {
              myzbList.push(res.data.data[item])
            }
            this.setData({ myzbList: myzbList })
          }
        }
        break;
      default:
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'fail',
        //   duration: 2000
        // })
        break;
    }
  },

  //我的投标
  getMytbList: function (res) {
    wx.stopPullDownRefresh()
    switch (res.data.code) {
      case 0:
        if (this.data.wdtbPage == 1) {
          this.setData({ mytbList: res.data.data })
        } else {
          var mytbList = this.data.mytbList
          if (res.data.data.length == 0) {
            this.showToast()
          } else {
            for (var item in res.data.data) {
              mytbList.push(res.data.data[item])
            }
            this.setData({ mytbList: mytbList })
          }
        }
        break;
      default:
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'fail',
        //   duration: 2000
        // })
        break;
    }
  },

  //我的任务
  getMyTaskList: function (res) {
    wx.stopPullDownRefresh()
    switch (res.data.code) {
      case 0:
        if (this.data.wdrwPage == 1) {
          this.setData({ myTaskList: res.data.data })
        } else {
          var myTaskList = this.data.myTaskList
          if (res.data.data.length == 0) {
            this.showToast()
          } else {
            for (var item in res.data.data) {
              myTaskList.push(res.data.data[item])
            }
            this.setData({ myTaskList: myTaskList })
          }
        }
        break;
      default:
        // wx.showToast({
        //   title: res.data.message,
        //   icon: 'fail',
        //   duration: 2000
        // })
        break;
    }
  },

  showToast: function () {
    wx.showToast({
      title: "已获取到所有数据!",
      icon: 'success',
      duration: 2000
    })
  },

  //结案
  closeZb: function (res) {
    switch (res.data.code) {
      case 0:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        this.reloadData()
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 2000
        })
        break;
    }
  },

  //终止招标
  endZb: function (res) {
    switch (res.data.code) {
      case 0:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        this.reloadData()
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 2000
        })
        break;
    }

  },


  download_zb_file: function (res) {
    wx.showToast({
      title: '获取附件中',
      icon: 'loading',
      duration: 10000
    })
    switch (res.data.code) {
      case 0:
        wx.request({
          url: res.data.data.file_url,
          data: {},
          method: 'GET',
          success: function (getres) {
            // wx.hideToast()
            var file = getres.data.split("/")
            var filename = file[file.length - 1]
            console.error(getres.data)
            wx.downloadFile({
              url: getres.data, //仅为示例，并非真实的资源
              success: function (res_down) {
                wx.openDocument({
                  filePath: res_down.tempFilePath,
                  success: function (res_) {
                    wx.showToast({
                      title: "打开文档成功",
                      icon: 'warn',
                      duration: 2000
                    })
                  }, 
                  fail: function (res_) {
                    wx.showToast({
                      title: "打开文档失败",
                      icon: 'warn',
                      duration: 2000
                    })
                  }, 
                  complete() {
                    wx.hideToast()
                    wx.request({
                      url: 'https://www.yiqiyun.org/filepgb/getfile/del_file.php?file_name=' + filename,
                      data: {},
                      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function (res) {
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
              }

            })
          },
          fail: function (res) {
           console.error(res);
          },
          complete: function () {
            // complete
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 3000
        })
        break;
    }

  },
  refresh: function (e) {
    var sCmd
    switch (e.currentTarget.id) {
      case "0":     //招标中
        this.setData({ zbzPage: 1 })
        sCmd = { "cmd": "business.getZbList", "data": {} };
        break;
      case "1":     //我的招标
        this.setData({ wdzbPage: 1 })
        sCmd = { "cmd": "business.getMyZbList", "data": {} };
        break;
      case "2":     //我的投标
        this.setData({ wdtbPage: 1 })
        sCmd = { "cmd": "business.getMytbList", "data": {} };
        break;
      case "3":     //我的任务
        this.setData({ wdrwPage: 1 })
        sCmd = { "cmd": "business.getMyTaskList", "data": {} };
        break;
      default:
        break;
    }
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);
    this.onLoad()
  },

  getMoreInfo: function () {
    var sCmd
    var page
    switch (this.data.activeIndex) {
      case "0":     //招标中
        page = this.data.zbzPage + 1
        this.setData({ zbzPage: page })
        sCmd = { "cmd": "business.getZbList", "data": { page: page } };
        break;
      case "1":     //我的招标
        page = this.data.wdzbPage + 1
        this.setData({ wdzbPage: page })
        sCmd = { "cmd": "business.getMyZbList", "data": { page: page } };
        break;
      case "2":     //我的投标
        page = this.data.wdtbPage + 1
        this.setData({ wdtbPage: page })
        sCmd = { "cmd": "business.getMytbList", "data": { page: page } };
        break;
      case "3":     //我的任务
        page = this.data.wdrwPage + 1
        this.setData({ wdrwPage: page })
        sCmd = { "cmd": "business.getMyTaskList", "data": { page: page } };
        break;
      default:
        break;
    }
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  loadMore: function (e) {

    // this.setData({page: this.data.page + 1})
    console.log(e.currentTarget.id)
    console.log("上拉拉加载更多...." + this.data.page)

    // this.getDataFromServer(this.data.page)
  },

  onPullDownRefresh: function () {
    this.reloadData()
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    })
  },
  bindinput: function (e) {
    this.setData({ email: e.detail.value })
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    var that = this
    this.setData({
      nocancel: !this.data.nocancel,
      hidden: true
    });
    wx.getStorage({
      key: 'email',
      success: function (res) {
        if (res.data != that.data.email) {
          try {
            wx.setStorageSync('email', that.data.email)
          } catch (e) {
          }
        }
      },
      fail: function () {
        wx.setStorage({
          key: "email",
          data: that.data.email
        })
      }
    })
    var sCmd = {
      "cmd": "business.AgainSendEmail_kcfile",
      "data": { "zbid": this.data._ID, "email": this.data.email }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  AgainSendEmail_kcfile: function (res) {
    wx.showToast({
      title: res.data.message,
      icon: 'success',
      duration: 2000
    })
  }

});
