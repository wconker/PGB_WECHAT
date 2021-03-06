var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var mZhlxIndex = 0
Page({
  data: {
    showTopTips: false,
    tips: "",
    files: [],
    xjbdw: "",

    citys: {},
    group: [],
    wylx: '',
    wylxs: [],
    wylxIndex: null,

    zcs: "",
    szcs: "",
    jzmj: "",
    bz: "",
    enable: false,
    xjlbs: ["外部询价", "内部询价"],
    xjlbIndex: null,

    xjfas: [],
    xjfaIndex: 0,
    bc: '',
    yxbjs: '',

    yxsjs: [],
    yxsjIndex: 4,

    zhlxjs: [],
    zhlxIndex: 1,

    bz: '',

    // jjs: [{ "name": "不加价", "value": "0" },
    // { "name": "加价10元", "value": "10" },
    // { "name": "加价50元", "value": "50" },
    // { "name": "加价100元", "value": "100" },
    // ],
    // jjIndex: 0,

    xjid: 0,
    isRepeat2nb: false,
    isRepeat: false,
    isReXjlb: false,
    fwxm: '',
    xjyxsj: '',
    flagNB: 0,
    fromPage: 0,

    isSearchVisible: false,
    add_e: null,


  },
  //conker 点击跳转到
  gogroup: function () {
    wx.navigateTo({
      url: '/pages/core/selectp/selectp'
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },


  bindOk: function (e) {
    this.setData({ isSearchVisible: true, add_e: e })

  },

  bindCoverTap: function () {
    this.setData({ isSearchVisible: false })
  },

  dialogConfirm: function () {
    this.setData({ isSearchVisible: false })
    this.confirm2Add(this.data.add_e)
  },

  dialogCancel: function () {
    this.setData({ isSearchVisible: false })
  },

  confirm2Add: function (e) {
    var that = this;

    mZhlxIndex = this.data.zhlxIndex
    var xjdx = [];
    var usrs = this.data.group;
    for (var c = 0; c < usrs.length; c++) {
      xjdx.push(usrs[c].userid);
    }
    //内部询价规则为必须选择一个成员
    if (this.data.xjlbIndex == '1' && xjdx.length == 0) {
      wx.showToast({
        title: '请指定内部询价人员',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    //todo...数据校验
    var mCmd
    if (this.data.fromPage == -1) {
      mCmd = "UpdateXj"
    } else {
      mCmd = "addxj"
    }

    console.log("ww",this.data.xjfas);
      console.log("ww",this.data.xjfaIndex);
    var sCmd = {
      "cmd": "business." + mCmd,
      "data": {
        "szcs": this.data.citys.dqdm,
        "xjbdw": this.data.xjbdw,
        "zcs": this.data.zcs,
        "szc": this.data.szcs,
        "mj": this.data.jzmj,
        "bz": this.data.bz,
        "bc": this.data.bc,
        "yxbjs": this.data.yxbjs,
        "nbxj": this.data.xjlbIndex,
        "wylx": this.data.wylxs[this.data.wylxIndex].value,
        "xjyxsj": this.data.yxsjs[this.data.yxsjIndex].value,
        // "jj": this.data.jjs[this.data.jjIndex].value,
        //"fwxm": this.data.xjfas[this.data.xjfaIndex].fwxm,
        "zhlx": "充值账户",
        "xjdx": xjdx,
        "form_id": e.detail.formId
      }
    }



    if (this.data.fromPage == -1) {
      sCmd.data["xjid"] = this.data.xjid
    }

    this.setData({ enable: true });
    WxNotificationCenter.postNotificationName("send", sCmd);
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

  xjbdwBindblur: function (e) {
  
    this.setData({ xjbdw: e.detail.value })
  },
  zcsBindblur: function (e) {
    this.setData({ zcs: e.detail.value })
  },
  szcsBindblur: function (e) {
    this.setData({ szcs: e.detail.value })
  },
  jzmjBindblur: function (e) {
    this.setData({ jzmj: e.detail.value })
  },
  bzBindblur: function (e) {
    this.setData({ bz: e.detail.value })
  },
  bindCityChange: function (e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },
  bindBcChange: function (e) {
    this.setData({ bc: e.detail.value })
  },
  bindYxbjsChange: function (e) {
    this.setData({ yxbjs: e.detail.value })
  },
  // bindJjChange: function (e) {
  //   this.setData({
  //     jjIndex: e.detail.value
  //   })
  // },
  bindXjlbChange: function (e) {
    //选择类别的索引
    this.setData({
      xjlbIndex: e.detail.value
    })
    console.log('hudjauishdihasd:',e.detail.value)
    //conker 如果是内部做标记
    if (e.detail.value == 1) {
      this.setData({
        flagNB: 1
      })
    };

    if (e.detail.value == 1 && e.detail.value != 0 ) {
      console.log('5555555555555', e.detail.value)
      wx.navigateTo({
        url: '/pages/core/selectp/selectp'
      })
    };



    //conker 切换后做初始化
    this.setData({
      group: []
    });
    try {
      var sCmd = {
        "cmd": "conn.getXjfa",
        "data": {
          "wylx": this.data.wylxs[this.data.wylxIndex].value,
          "fwdl": "询价",
          "nbbz": this.data.xjlbIndex
        }
      };
    }
    catch (e) {
      wx.showToast({
        title: '请选择询价类型',
        icon: 'success',
        duration: 2000
      })
    }
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  bindWylxChange: function (e) {
    this.setData({
      wylxIndex: e.detail.value
    })
  },
  bindYxsjChange: function (e) {
    this.setData({
      yxsjIndex: e.detail.value
    })
  },
  // bindXjfaChange: function (e) {
  //   this.setData({
  //     xjfaIndex: e.detail.value,
  //     bc: this.data.xjfas[e.detail.value].zdj,
  //   })
  // },
  bindZhlxChange: function (e) {
    this.setData({
      zhlxIndex: e.detail.value,
    })
  },
  choseCity: function (e) {
    this.data.recordIndex = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/core/selectcity/selectcity'
    })
  },
  onShow: function () {
    WxNotificationCenter.addNotification("conn.getSyType", this.getSyType, this)
    WxNotificationCenter.addNotification("business.addxj", this.addxj, this)
    WxNotificationCenter.addNotification("conn.getXjfa", this.getXjfa, this)
    WxNotificationCenter.addNotification("business.getMyxjInfo", this.getMyxjInfo, this)
    WxNotificationCenter.addNotification("business.UpdateXj", this.UpdateXj, this)
    WxNotificationCenter.addNotification("user.applyWxXjPay", this.applyWxXjPay, this)
    //城市选择的返回
    if (getApp().data.city != "!!!") {
      this.setData({ citys: getApp().data.city });
    }
    //内部人员的返回
    if (getApp().data.select != "!!!" && getApp().data.select[0] != undefined) {
      this.setData({ group: getApp().data.select,yxbjs:getApp().data.select.length });


    }
    //自动定位
    console.log('sxd', this.data.local)
    if (this.data.citys.dqdm == undefined) {
      this.setData({ citys: getApp().data.local });
    }
    getApp().data.select = "!!!";
    getApp().data.city = "!!!"

  },
  onHide: function () {
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addxj", this)
    WxNotificationCenter.removeNotification("conn.getXjfa", this)
    WxNotificationCenter.removeNotification("business.getMyxjInfo", this)
    WxNotificationCenter.removeNotification("business.UpdateXj", this)
    WxNotificationCenter.removeNotification("user.applyWxXjPay", this)
  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("conn.getSyType", this)
    WxNotificationCenter.removeNotification("business.addxj", this)
    WxNotificationCenter.removeNotification("conn.getXjfa", this)
    WxNotificationCenter.removeNotification("business.getMyxjInfo", this)
    WxNotificationCenter.removeNotification("business.UpdateXj", this)
    WxNotificationCenter.removeNotification("user.applyWxXjPay", this)

  },
  onLoad: function (e) {
    this.setData({ xjid: e.xjid, fromPage: e.fromPage })
    var that = this
    if (this.data.xjid != undefined) {
      var sCmd = { "cmd": "business.getMyxjInfo", "data": { "xjid": parseInt(e.xjid) } };
      WxNotificationCenter.postNotificationName("send", sCmd);
    }

    var sCmd = { "cmd": "conn.getSyType", "data": { "type": "xj" } };
    WxNotificationCenter.postNotificationName("send", sCmd);

    //this.reloadXjfa()
  },
  //获取系统代码字典
  getSyType: function (res) {
    this.setData({ wylxs: res.data.data[0].wylxs })
    this.setData({ yxsjs: res.data.data[0].yxsj })
    this.setData({ zhlxjs: res.data.data[0].zhlx })
    this.setData({ zhlxIndex: mZhlxIndex })
    if (this.data.isRepeat) {
      this.setData({ isRepeat: false })
      this.reSetWylx_Yxsj()
    } else {
      this.setData({ isRepeat: true })
    }
  },
  //添加询价
  addxj: function (res) {
    this.getAddxj_Update(res)
  },
  UpdateXj: function (res) {
    this.getAddxj_Update(res)
  },
  getAddxj_Update(res) {
    var that = this
    if (res.data.code == 0) {
      //循环上传图片
      var fileIndex = 1;
      for (var item in that.data.files) {
        var sData = {
          "userid": getApp().data.userid,
          "imgtype": encodeURI('产权证'),
          "imgname": fileIndex,
          "fjbs": res.data.data.fjbs,
          "xjid": res.data.data.xjid
        }
        //bug待处理，android 无法多张上传图片
        wx.uploadFile({
          count: 8,
          url: getApp().data.url,
          filePath: that.data.files[item],
          name: 'file',
          formData: sData,
          header: { "content-type": 'application/x-www-form-urlencoded' },
        });
        fileIndex++;
      }


      console.log("询价支付",res);
      if (res.data.data.zt == -1) {  //
        // wx.showModal({
        //   title: '提示',
        //   cancelText: '稍后',
        //   confirmText: "立即前往",
        //   content: '余额不足，请充值后操作！',
        //   success: function (res) {
        //     if (res.confirm) {
        //       //conker 关闭当前页的跳转
        //       wx.redirectTo({
        //         url: '/pages/mine/pay/pay'
        //       });
        //     }
        //     else {
        //       //返回询价页面
        //       wx.navigateBack({
        //         delta: 1, // 回退前 delta(默认为1) 页面
        //         success: function (res_) {
        //           // success
        //           wx.showToast({
        //             title: res.data.message,
        //             icon: 'success',
        //             duration: 2000
        //           })
        //         }
        //       });
        //     }
        // }
        // })

        wx.showToast({
          title: "生成支付单",
          icon: 'loading',
          duration: 10000
        })

        var sCmd = { "cmd": "user.applyWxXjPay",
         "data": { xjid: res.data.data.xjid, 
         "total_fee": res.data.data.bc, 
         "body": "评估帮在线充值" } };
        WxNotificationCenter.postNotificationName("send", sCmd);

      }
      else {
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function (res_) {
            // success
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
          }
        });
      }
    } else {
      //conker 发生错误，把按钮恢复可用状态
      that.setData({ enable: false });
      wx.showToast({
        title: res.data.message,
        duration:2000
      })
    }
  },
  applyWxXjPay: function (res) {
    wx.hideToast()
    switch (res.data.code) {
      case 0:
        wx.requestPayment({
          'appId': res.data.data.appId,
          'timeStamp': (res.data.data.timeStamp).toString(),
          'nonceStr': res.data.data.nonceStr,
          'package': res.data.data.package,
          'signType': 'MD5',
          'paySign': res.data.data.paySign,
          'success': function (respay) {
            wx.showToast({
              title: "支付成功",
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          },
          'fail': function (respay) {
            console.log(respay)
            wx.showToast({
              title: "支付失败",
              icon: 'success',
              duration: 1000
            })
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
        })
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

  getXjfa: function (res) {
    if (this.data.isReXjlb) {
      this.setData({ isReXjlb: false, xjfas: res.data.data.xjfa, })
      for (var item in res.data.data.xjfa) {
        if (this.data.fwxm == res.data.data.xjfa[item].fwxm) {
          this.setData({ xjfaIndex: item })
          break;
        }
      }
    } else {
      this.setData({
        xjfas: res.data.data.xjfa,
        bc: res.data.data.bc,
      });
      //conker 防止先跳转而获取不到数据
      // if (this.data.isRepeat2nb) {
      //   this.setData({ isRepeat2nb: false })
      // } else if (this.data.flagNB == 1) {
      //   wx.navigateTo({
      //     url: '/pages/core/selectp/selectp'
      //   })
      // }
      this.setData({
        flagNB: 0
      })
    }
  },
  getMyxjInfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData(res.data.data[0])
        this.data.files.length = 0
        for (var item in res.data.data[0].cqz_img) {
          this.setData({ files: this.data.files.concat(res.data.data[0].cqz_img[item].img_url) })
        }
        this.setData({ citys: { dqmc: res.data.data[0].szscmc, dqdm: res.data.data[0].szcs }, yxsjIndex: res.data.data[0].yxsjIndex, zhlxIndex: res.data.data[0].zhlxIndex, xjlbIndex: res.data.data[0].nbxj, yxbjs: res.data.data[0].jsbjtj, jzmj: res.data.data[0].mj, bc: res.data.data[0].bc })
        if (this.data.isRepeat) {
          this.setData({ isRepeat: false })
          this.reSetWylx_Yxsj()
        } else {
          this.setData({ isRepeat: true })
        }
        this.reXjlb(res.data.data[0].nbxj)
        break;
      default:

 
        break;
    }
  },
  //重新发布--设置询价类别
  reSetWylx_Yxsj() {
    for (var index in this.data.wylxs) {
      if (this.data.wylx == this.data.wylxs[index].value) {
        this.setData({
          wylxIndex: index
        })
        break;
      }
    }
    for (var index in this.data.yxsjs) {
      if (this.data.xjyxsj == this.data.yxsjs[index].value) {
        this.setData({
          yxsjIndex: index
        })
        break;
      }
    }
    for (var index in this.data.jjs) {
      if (this.data.jj == this.data.jjs[index].value) {
        this.setData({
          jjIndex: index
        })
        break;
      }
    }
    for (var index in this.data.zhlxjs) {
      if (this.data.zhlx == this.data.zhlxjs[index].value) {
        this.setData({
          zhlxIndex: index
        })
        break;
      }
    }
    this.setData({ group: [] })
    for (var index in this.data.nb_list) {
      this.setData({ group: this.data.group.concat(this.data.nb_list[index][0]) })
    }
    this.setData({ isRepeat2nb: true })
    var sCmd = {
      "cmd": "conn.getXjfa",
      "data": {
        "wylx": this.data.wylxs[this.data.wylxIndex].value,
        "fwdl": "询价",
        "nbbz": this.data.xjlbIndex
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },
  //重新发布 设置询价范围
  reXjlb: function (res) {
    this.setData({
      xjlbIndex: res
    })
    //conker 如果是内部做标记
    if (res == 1) {
      this.setData({
        flagNB: 1
      })
    } else {
      this.setData({
        isReXjlb: true
      })
    }
    //conker 切换后做初始化
    // this.setData({
    //   group: []
    // })
  }, mapSearch: function () {
    var me = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address);

        me.setData({
          xjbdw: res.address
        })
      },
    })
  }
});