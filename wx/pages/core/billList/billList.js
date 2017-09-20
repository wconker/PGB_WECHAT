//新闻列表 广播添加完成  
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
var factory = require("../../../utils/Factory.js");//辅助类
var list = []
Page({
  data: {
    bill: [],
    fromPage: '',
    tabs: ["充值", "收支", "提现"],
    hidden: true,
    nocancel: true,
    money: 0,
    _ID: 0,
    showInfo: false
  },
  onLoad: function (option) {
    this.setData({ fromPage: option.fromPage })

    WxNotificationCenter.addNotification("user.getMyTxjl", this.getMyTxjl, this)
    WxNotificationCenter.addNotification("user.getXjlsList", this.getXjlsList, this)
    WxNotificationCenter.addNotification("user.getTklist", this.getTklist, this)
    WxNotificationCenter.addNotification("user.ApplyWxRefund", this.ApplyWxRefund, this)
    var protocol;
    switch (this.data.fromPage) {
      case "bill":
        list = []
        protocol = 'getMyCzjl'
        var sCmd = {
          "cmd": "user.getTklist",
          "data": {}
        };
        WxNotificationCenter.postNotificationName("send", sCmd);
        this.setData({
          activeIndex: '0',
          sliderOffset: 0
        });
        break;
      case "gobindmoney":
        protocol = 'getXjlsList'
        this.setData({
          activeIndex: '1',
          sliderOffset: 125
        });
        break;
      case "getbill":
        protocol = 'getMyTxjl'
        this.setData({
          activeIndex: '2',
          sliderOffset: 250
        });
        break;
      default:
        break;
    }
    //TODO:增加分页 下拉刷新
    var sCmd = {
      "cmd": "user." + protocol,
      "data": {}
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  onPullDownRefresh: function () {
    var protocol;
    switch (this.data.fromPage) {
      case "bill":
        list = []
        protocol = 'getMyCzjl'
        var sCmd = {
          "cmd": "user.getTklist",
          "data": {}
        };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      case "getbill":
        protocol = 'getMyTxjl'
        break;
      case "gobindmoney":
        protocol = 'getXjlsList'
        break;
      default:
        break;
    }
    //TODO:增加分页 下拉刷新
    var sCmd = {
      "cmd": "user." + protocol,
      "data": {}
    };
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 1000
    })
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  rePay: function (e) {
    var that = this
    this.setData({ hidden: false, nocancel: false, _ID: e.target.dataset.select, money: this.data.bill[e.target.dataset.select].czje })
  },

  bindRefundInfo: function (e) {
    console.log(e.target.dataset.select)
    var pageUrl = '/pages/core/billItem/billItem?czid=' + this.data.bill[e.target.dataset.select].czid
    wx.navigateTo({
      url: pageUrl
    })
  },

  bindDetail: function (e) {
    if (this.data.fromPage == "gobindmoney") {
      var pageUrl;
      switch (e.target.dataset.sm) {
        case "tb":
          pageUrl = '/pages/task/answerdetail/answerdetail?tbid=' + event.currentTarget.id;
          break;
        case "xj":
          pageUrl = '/pages/ask/detail/detail?xjid=' + e.currentTarget.id + '&fromPage=XjList';
          break;
        case "bj":
          pageUrl = '/pages/ask/answerdetail/answerdetail?bjid=' + event.currentTarget.id;
          break;
        case "zb":
          pageUrl = '/pages/task/detail/detail?zbid=' + event.currentTarget.id;
          break;
        default:
          break;
      }
      wx.navigateTo({
        url: pageUrl
      })
    }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    var protocol;

    //TODO:增加分页 下拉刷新

    switch (e.currentTarget.id) {
      case '0':
        list = []
        protocol = 'getMyCzjl'
        this.setData({ fromPage: 'bill' });
        var sCmd = {
          "cmd": "user.getTklist",
          "data": {}
        };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      case '1':
        protocol = 'getXjlsList'
        this.setData({ fromPage: 'gobindmoney' });
        break;
      case '2':
        protocol = 'getMyTxjl'
        this.setData({ fromPage: 'getbill' });
        break;

      default:
        break;
    }
    var sCmd = {
      "cmd": "user." + protocol,
      "data": {}
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
    // this.reloadData()
  },

  getTklist: function (res) {
    var that = this
    switch (res.data.code) {
      case 0:
        for (var item in res.data.data) {
          var param = {}
          param["czid"] = res.data.data[item].czid
          param["czje"] = res.data.data[item].tkje
          if (res.data.data[item].zt == 1) {
            param["czlx"] = "退款成功"
          } else if (res.data.data[item].zt == -1) {
            param["czlx"] = "退款失败"
          } else {
            param["czlx"] = "退款中"
          }
          param["czsj"] = res.data.data[item].tksj
          param["ddh"] = res.data.data[item].ddh
          param["istkbz"] = true
          param["mc"] = res.data.data[item].tksm == null ? "" : res.data.data[item].tksm
          param["sj"] = Date.parse(new Date(res.data.data[item].tksj));
          param["zt"] = res.data.data[item].zt
          list.push(param)
        }
        list.sort(function (a, b) {
          return b.sj - a.sj
        });
        that.setData({ bill: list })
        break;
      default:
        break;
    }
  },
  //流水记录
  getMyCzjl: function (res) {
    var that = this
    switch (res.data.code) {
      case 0:
        for (var item in res.data.data) {
          var param = {}
          param["czid"] = res.data.data[item].czid
          param["czje"] = res.data.data[item].czje
          param["czlx"] = res.data.data[item].czlx
          param["czsj"] = res.data.data[item].czsj
          param["ddh"] = res.data.data[item].ddh
          param["istkbz"] = false
          param["mc"] = res.data.data[item].xmmc
          param["sj"] = Date.parse(new Date(res.data.data[item].czsj));
          list.push(param)
        }
        list.sort(function (a, b) {
          console.log(a.czsj)
          return b.sj - a.sj
        });
        that.setData({ bill: list })
        break;
      default:
        break;
    }
  },

  getMyTxjl: function (res) {
    this.saveData(res)
  },

  getXjlsList: function (res) {
    this.saveData(res)
  },

  saveData: function (res) {
    wx.stopPullDownRefresh()
    // this.setData({ bill: ["",""] })
    switch (res.data.code) {
      case 0:
        if (res.data.data.length > 0) {
          this.setData({ showInfo: false })
        } else {
          this.setData({ showInfo: true })
        }
        this.setData({ bill: res.data.data })
        break;
      default:
        this.setData({ showInfo: true })
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 2000
        })
        break;
    }
  },

  ApplyWxRefund: function (res) {
    switch (res.data.code) {
      case 0:
      list = []
        var sCmd = {
          "cmd": "user.getTklist",
          "data": {}
        };
        WxNotificationCenter.postNotificationName("send", sCmd);
        var sCmd = {
          "cmd": "user.getMyCzjl",
          "data": {}
        };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      default:
        break;
    }
    wx.showToast({
      title: res.data.message,
      icon: 'success',
      duration: 2000
    })
  },

  onShow: function () {
    WxNotificationCenter.addNotification("user.getMyCzjl", this.getMyCzjl, this)
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("user.getMyCzjl", this)
    WxNotificationCenter.removeNotification("user.getTklist", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.getMyCzjl", this)
    WxNotificationCenter.removeNotification("user.getTklist", this)
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      nocancel: !this.data.nocancel,
      hidden: true
    });

    if (this.data.money <= this.data.bill[this.data._ID].czje) {
      var sCmd = {
        "cmd": "user.ApplyWxRefund",
        "data": { "ddh": this.data.bill[this.data._ID].ddh, "je": this.data.money }
      };
      WxNotificationCenter.postNotificationName("send", sCmd);
    } else {
      factory.alert("提示", '输入金额必须不大于该笔充值！');
    }
  },

  bindinput: function (res) {
    this.setData({ money: res.detail.value })
  },
  //点击提交   
  listenFormSubmit: function (e) {
    console.log('listenFormSubmit=', e.detail.formId)
  },

})
