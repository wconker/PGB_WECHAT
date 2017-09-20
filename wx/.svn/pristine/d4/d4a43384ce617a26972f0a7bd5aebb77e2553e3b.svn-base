var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var factory = require("../../../utils/Factory.js");//辅助类
Page({
  data: {
    witch: "",
    email: '',
    phone: '',
    yzm: '',
    jgmc: '',
    sqbz: '',
    emailmsg: '',
    gsmsg: '',
    phonemsg: '',
    yzmtext: '获取验证码',
    tjlist: [],
    yzmbyemail: "",
    one: {},
    user: {},
    mail_yzm_status: false,
    phone_yzm_status: false

  },

  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  setemailyzm: function (e) {
    this.setData({ yzmbyemail: e.detail.value })
  },

  getyzmbyemail: function (e) {
    var me = this;
    var t = 10;
    this.setData({ mail_yzm_status: true });
    var sCmd = { "cmd": 'conn.getEmailCode', data: { "email": this.data.email } };
    WxNotificationCenter.postNotificationName("send", sCmd);
    var tt = setInterval(function () {
      t--;
      me.setData({ yzmtext: t + "s" + "秒后重新发送" });
      if (t == 0) {
        me.setData({ yzmtext: "获取验证码" });
        clearTimeout(tt);
        me.setData({ mail_yzm_status: false });
      }
    }, 1000);

  },

  onLoad: function (options) {
    var me = this;
    if (parseInt(options.witch) == 3) {
      var sCmd = { "cmd": "user.getPggsTjList", "data": {} };
      WxNotificationCenter.postNotificationName("send", sCmd);
    }

    this.setData({
      jgmc: getApp().data.user.gsmc,
      witch: parseInt(options.witch)
    });

    var getUsercmd = { "cmd": "user.getUserinfo", "data": {} };
    WxNotificationCenter.postNotificationName("send", getUsercmd);
  },
  // 推荐公司
  selectitem: function (e) {
    var u = this.data.user;
    this.setData({
      jgmc: e.target.dataset.jgmc,
      one: e.target.dataset.choseone,
      sqbz: "我是" + u.xm == '' ? '' : u.xm
    })
  },

  onShow: function (e) {

    //注册接收的协议
    WxNotificationCenter.addNotification("conn.getVertifyCode", this.getVertifyCode, this)
    WxNotificationCenter.addNotification("conn.getEmailCode", this.getEmailCode, this)
    WxNotificationCenter.addNotification("user.getPggsTjList", this.getPggsTjList, this)
    WxNotificationCenter.addNotification("user.getUserinfo", this.getUserinfo, this)
    WxNotificationCenter.addNotification("user.verifyCompany", this.verifyCompany, this)
    WxNotificationCenter.addNotification("user.bindSjhm", this.bindSjhm, this)
    WxNotificationCenter.addNotification("user.bindEmail", this.bindEmail, this)
    WxNotificationCenter.addNotification("user.bindCompany", this.bindCompany, this)

    var comp = getApp().data.comp;
    var u = this.data.user;
    if (getApp().data.jgmc != "!!!") {
      this.setData({
        one: comp,
        jgmc: getApp().data.jgmc,
        sqbz: "我是" + u.xm == '' ? '' : u.xm
      });
    }
    getApp().data.jgmc = "!!!"

  },

  onHide: function () {
    WxNotificationCenter.removeNotification("conn.getVertifyCode", this)
    WxNotificationCenter.removeNotification("conn.getEmailCode", this)
    WxNotificationCenter.removeNotification("user.getPggsTjList", this)
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
    WxNotificationCenter.removeNotification("user.verifyCompany", this)
    WxNotificationCenter.removeNotification("user.bindSjhm", this)
    WxNotificationCenter.removeNotification("user.bindEmail", this)
    WxNotificationCenter.removeNotification("user.bindCompany", this)
  },

  onUnload: function () {
    WxNotificationCenter.removeNotification("conn.getVertifyCode", this)
    WxNotificationCenter.removeNotification("conn.getEmailCode", this)
    WxNotificationCenter.removeNotification("user.getPggsTjList", this)
    WxNotificationCenter.removeNotification("user.getUserinfo", this)
    WxNotificationCenter.removeNotification("user.verifyCompany", this)
    WxNotificationCenter.removeNotification("user.bindSjhm", this)
    WxNotificationCenter.removeNotification("user.bindEmail", this)
    WxNotificationCenter.removeNotification("user.bindCompany", this)
  },

  //申请入住
  ifapply: function (msg) {
    var me = this;
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          var sCmd = { "cmd": "user.verifyCompany", "data": { "jgmc": me.data.jgmc } };
          WxNotificationCenter.postNotificationName("send", sCmd);
        }
      }
    });
  },
  goselectcomp: function () {
    wx.navigateTo({
      url: '/pages/core/selectcomp/selectcomp',
    })
  },
  //获取验证码
  getyzm: function () {
    var sCmd = { "cmd": "conn.getVertifyCode", "data": { "sjhm": this.data.phone } };
    WxNotificationCenter.postNotificationName("send", sCmd);
    var me = this;
    var t = 300;
    me.setData({ phone_yzm_status: true });
    var tt = setInterval(function () {
      t--;
      me.setData({ yzmtext: t + "s" + "秒后重新发送" });
      if (t == 0) {
        me.setData({ yzmtext: "获取验证码" });
        clearTimeout(tt);
        me.setData({ phone_yzm_status: false });
      }
    }, 1000);
  },
  bindOkforphone: function () {
    var sCmd = { "cmd": "user.bindSjhm", "data": { "sjhm": this.data.phone, "yzm": this.data.yzm } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },

  setphone: function (e) { this.setData({ phone: e.detail.value }); },

  setyzm: function (e) { this.setData({ yzm: e.detail.value }); },

  setemail: function (e) { this.setData({ email: e.detail.value }); },
  bindOkforemail: function () {
    var sCmd = {
      "cmd": "user.bindEmail",
      "data": {
        "email": this.data.email,
        "yzm": this.data.yzmbyemail
      }
    };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },


  setsqbz: function (e) {
    this.setData({
      sqbz: e.detail.value
    })
  },

  bindOkforcompany: function (e) {
    if (getApp().data.user.gsmcbdbz == 1) {
      factory.alert("提示", '请勿重复绑定！如有疑问请咨询客服！');
      return;
    }
    if (this.data.one.jzbz == 0) {
      this.ifapply("该公司目前未被入住,是否申请入住");
    } else {
      var sCmd = { "cmd": "user.bindCompany", "data": { "jgmc": this.data.jgmc, "sqbz": this.data.sqbz, "form_id": e.detail.formId } };
      WxNotificationCenter.postNotificationName("send", sCmd);
    }
  },
  //协议接收 getVertifyCode
  getVertifyCode: function (res) {
    var me = this;
    switch (res.data.code) {
      case 0:
        me.setData({
          yzmtext: "验证码已发送"
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'warn',
          duration: 2000
        })
        me.setData({
          phonemsg: res.data.message,
        })
        break;
    }
  },
  getEmailCode: function (res) {
    var me = this;
    switch (res.data.code) {
      case 0:
        factory.showToast("验证码已发送", 1500);
        break;
      default:
        factory.showToast(res.data.message, 2000);
        break;
    }
  },

  getPggsTjList: function (res) {
    var u = this.data.user;
    switch (res.data.code) {
      case 0:
        this.setData({
          tjlist: res.data.data,
          sqbz: '我是' + u.xm == '' ? '' : u.xm
        })
        break;
      default:
        break;
    }
  },

  getUserinfo: function (res) {
    switch (res.data.code) {
      case 0:
        this.setData({
          email: res.data.data[0].dzyx,
          jgmc: res.data.data[0].gsmc,
          user: res.data.data[0],
          yzmtext: '发送验证码',
          phone: res.data.data[0].sjhm
        })
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


  verifyCompany: function (res) {
    switch (res.data.code) {
      case 0:
        getApp().data.gsmt = res.data.data.gsmt;
        getApp().data.yyzz = res.data.data.yyzz;
        this.setData({ gsmsg: res.data.message });
        wx.navigateTo({
          url: '/pages/mine/apply/apply'
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
  },

  bindSjhm: function (res) {
    this.setData({ phonemsg: res.data.message });
    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1,
          success: function (resv) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            // var getUsercmd = { "cmd": "user.getUserinfo", "data": {} };
            // WxNotificationCenter.postNotificationName("send", getUsercmd);
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        break;
    }
  },

  bindEmail: function (res) {
    this.setData({ emailmsg: res.data.message });
    switch (res.data.code) {
      case 0:
        wx.navigateBack({
          delta: 1,
          success: function (resv) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            // var getUsercmd = { "cmd": "user.getUserinfo", "data": {} };
            // WxNotificationCenter.postNotificationName("send", getUsercmd);
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        break;
    }
  },

  //绑定公司
  bindCompany: function (res) {
    switch (res.data.code) {
      case 0:


        wx.navigateBack({
          delta: 1,
          success: function (resv) {
            console.log("Conker-------------------------------------------------");

           
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration:3000
              });
      
            // var getUsercmd = { "cmd": "user.getUserinfo", "data": {} };
            // WxNotificationCenter.postNotificationName("send", getUsercmd);
          }
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })
        break;
    }
  }
})