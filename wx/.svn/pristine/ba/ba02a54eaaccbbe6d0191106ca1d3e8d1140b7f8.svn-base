Page({
  data: {
    thisuserinfo: {},
    frompage: '',
    title: '',
    hidden: true,
    ly: '',
    thistype: '',
    userid: 0,
    smtemp: 1,
    fctemp: 1,
    tdtemp: 1

  },
  onLoad: function (options) {
    app.setValue(this, "thisuserinfo", getApp().data.select);
    app.setValue(this, 'frompage', options.frompage);
  },


  //conker审核不同意
  sayno: function (e) {
    app.setValue(this, 'hidden', false);
    app.setValue(this, 'title', '驳回理由');
    app.setValue(this, 'thistype', e.currentTarget.dataset.xtype);
    app.setValue(this, 'userid', e.currentTarget.dataset.userid);


  },



  //conker 审核通过按钮
  sayyes: function (e) {
    app.setValue(this, 'thistype', e.currentTarget.dataset.xtype);
    var cmd_type = '';
    var me = this;
    switch (e.currentTarget.dataset.xtype) {
      case "sm":
        cmd_type = "实名认证";
        break;
      case "fc":
        cmd_type = "房产估价师";
        break;
      case "td":
        cmd_type = "土地估价师";
        break;
    }

    var sCmd = { "cmd": "user.TrialUser", "data": { "trialflag": 1, "squserid": e.currentTarget.dataset.userid, "type": cmd_type } };

    wx.showModal({
      title: '提示',
      content: '确定提交审核？',
      success: function (res) {
        if (res.confirm) {
          me.sendMsg(sCmd);
        }
      }
    })

  },

  onHide: function () {

    WxNotificationCenter.removeNotification("user.TrialUser", this)

  },
  onUnload: function () {
    WxNotificationCenter.removeNotification("user.TrialUser", this)
  },


  setly: function (e) {
    this.setData({
      ly: e.detail.value

    })
  },

  sendMsg: function (cmd) {
    WxNotificationCenter.addNotification("user.TrialUser", this.TrialUser, this)
    WxNotificationCenter.postNotificationName("send", cmd);
  },

  //接手返回信息
  TrialUser: function (res) {
    var me = this;
    if (res.data.code == 0) {
      switch (this.data.thistype) {
        case "sm":
          me.setData({ smtemp: 0 });
          break;
        case "fc":
          me.setData({ fctemp: 0 });
          break;
        case "td":
          me.setData({ tdtemp: 0 });
          break;
      }
    }
    app.alert("提示", res.data.message);
  },

  //conker理由关闭按钮
  cancel: function (e) {
    app.setValue(this, 'hidden', true);
  },

  //conker理由提交按钮
  confirm: function (e) {
    var cmd_type = '';
    var me = this;
    //判断不同的类别
    switch (this.data.thistype) {
      case "sm":
        cmd_type = "实名认证";
        break;
      case "fc":
        cmd_type = "房产估价师";
        break;
      case "td":
        cmd_type = "土地估价师";
        break;
    }
    var sCmd = {
      "cmd": "user.TrialUser", "data": {
        "trialflag": -1,
        "ly": this.data.ly,
        "squserid": this.data.userid,
        "type": cmd_type
      }
    };
    wx.showModal({
      title: '提示',
      content: '确定提交审核？',
      success: function (res) {
        if (res.confirm) {
          me.sendMsg(sCmd);
        }
      }
    })

    app.setValue(this, 'hidden', true);
  },
  preview: function (e) {
    wx.previewImage({
      current: e.target.dataset.image, // 当前显示图片的http链接
      urls: [e.target.dataset.image] // 需要预览的图片http链接列表
    })
  }
})
var app = getApp().data.factory;
var WxNotificationCenter = require("../../../../utils/WxNotificationCenter.js");//广播添加完成