var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({
    data: {
        bill: [],
        czid: 0,
        tabs: ["充值", "收支", "提现"],
        hidden: true,
        nocancel: true,
        showInfo: false
    },
    onLoad: function (options) {
        this.setData({ czid: options.czid })
        WxNotificationCenter.addNotification("user.getMyTkList", this.getMyTkList, this)
    },

    onShow: function () {
        var sCmd = {
            "cmd": "user.getMyTkList",
            "data": { czid: this.data.czid }
        };
        WxNotificationCenter.postNotificationName("send", sCmd);

    },

    onUnload: function () {
        WxNotificationCenter.removeNotification("user.getMyTkList", this)
    },

    getMyTkList: function (res) {
        wx.stopPullDownRefresh()
        switch (res.data.code) {
            case 0:
                this.setData({ bill: res.data.data })
                break;
            default:
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000
                })
                break;
        }
    },
    onPullDownRefresh: function () {
        var sCmd = {
            "cmd": "user.getMyTkList",
            "data": { czid: this.data.czid }
        };
        wx.showToast({
            title: '刷新中',
            icon: 'loading',
            duration: 1000
        })
        WxNotificationCenter.postNotificationName("send", sCmd);
    },
})

var app = getApp().data.factory;