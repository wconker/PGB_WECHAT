
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
    data: {
        plist: [{ name: "业务部", bz: '' }, { name: "评估部", bz: '' }],
        admin: 100,
        userid: 0,
        input: ''
    },
    onLoad: function (options) {
        WxNotificationCenter.addNotification("user.setMemberInfo", this.setMemberInfo, this);
        this.setData({ admin: options.admin, userid: options.userid })
    },
    onReady: function () {

    },
    onShow: function () {

    },
    onHide: function () {

    },
    onUnload: function () {
        WxNotificationCenter.removeNotification("user.setMemberInfo", this)
    },

    bmmc: function (e) {
        this.setData({
            input: e.detail.value
        })

    },

    bindsubmit: function (e) {
        var me = this;
        var select = this.data.input;
        getApp().data.select = this.data.input;
        var sCmd = {
            "cmd": "user.setMemberInfo",
            data: {
                "memberUserid": parseInt(me.data.userid),
                "adminFlag": parseInt(me.data.admin),
                'bm': select
            }
        };
        console.log(sCmd);
        WxNotificationCenter.postNotificationName("send", sCmd);


    },

    bindOk: function (e) {
        var me = this;
        var select = e.target.dataset.select;
        getApp().data.select = select.name;
        var sCmd = {
            "cmd": "user.setMemberInfo",
            data: {
                "memberUserid": parseInt(me.data.userid),
                "adminFlag": parseInt(me.data.admin),
                'bm': select.name
            }
        };
        console.log(sCmd);
        WxNotificationCenter.postNotificationName("send", sCmd);

    },
    setMemberInfo: function (res) {
        console.log(res);

        if (res.data.code == 0) {
            wx.navigateBack({
                delta: 1, // 回退前 delta(默认为1) 页面
                success: function (res_) {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'info',
                        duration: 2000
                    })
                },
                fail: function () {
                    // fail
                },
                complete: function () {
                    // complete
                }
            })

        }

    },

})