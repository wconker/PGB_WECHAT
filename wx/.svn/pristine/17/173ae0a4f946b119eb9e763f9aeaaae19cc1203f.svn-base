var WxNotificationCenter = require("../../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
    data: {
        show: 1,
        plist: [],
        ly: '',
        userid: 0,
        hidden: true,
        tabs: ['会员审核列表', '公司入驻申请列表'],
        sliderOffset: 0,
        comparewidth: 0
    },
    onLoad: function (options) {
        var me = this;
        wx.getSystemInfo({
            success: function (res) {
                app.setValue(me, "sliderOffset", (res.windowWidth / 2 - 125) / 2);
                app.setValue(me, "comparewidth", res.windowWidth / 2);

            }
        })
        this.sendrzMsg();
    },
    onShow: function () {
        WxNotificationCenter.addNotification("user.TrialUser", this.TrialUser, this)
        WxNotificationCenter.addNotification("user.getPendingAuditList", this.getlist, this)
        WxNotificationCenter.addNotification("user.getGsadminList", this.getGsadminList, this)
        this.sendrzMsg()
    },
    onHide: function () {
        WxNotificationCenter.removeNotification("user.getPendingAuditList", this)
        WxNotificationCenter.removeNotification("user.TrialUser", this)
        WxNotificationCenter.removeNotification("user.getGsadminList", this)
    },
    onUnload: function () {
        WxNotificationCenter.removeNotification("user.getPendingAuditList", this)
        WxNotificationCenter.removeNotification("user.TrialUser", this)
        WxNotificationCenter.removeNotification("user.getGsadminList", this)
    },
    getlist: function (res) {
        app.setValue(this, "plist", res.data.data)
        console.log(res);
    },
    bindOk: function (e) {
        getApp().data.select = e.target.dataset.select;
        wx.navigateTo({
            url: '/pages/mine/manager/Audit/Audit'
        })
    },

    preview: function (e) {
        wx.previewImage({
            current: e.target.dataset.image, // 当前显示图片的http链接
            urls: [e.target.dataset.image] // 需要预览的图片http链接列表
        })
    },

    //发送函数
    sendMsg: function (cmd) {
        WxNotificationCenter.postNotificationName("send", cmd);
    },
    sendrzMsg: function () {

        var sCmd = { "cmd": "user.getPendingAuditList", "data": {} };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },
    sendGsMsg: function () {
        var sCmd = { "cmd": "user.getGsadminList", "data": {} };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },
    //函数返回接受
    TrialUser: function (res) {
        app.alert("提示", res.data.message);
        this.sendGsMsg();
    },
    //tab切换
    tabClick: function (e) {
        var me = this;
        app.setValue(me, "plist", [])
        var offerset = me.data.comparewidth;
        app.setValue(me, "show", parseInt(e.currentTarget.id) + 1)
        if (this.data.show == 1) {
            this.setData({
                sliderOffset: (offerset - 125) / 2,
                activeIndex: e.currentTarget.id
            });
            me.sendrzMsg()
        };
        if (this.data.show == 2) {
            this.setData({
                sliderOffset: (offerset - 125) / 2 + me.data.comparewidth,
                activeIndex: e.currentTarget.id
            });
            me.sendGsMsg()
        }
    },
    //conker审核不同意
    sayno: function (e) {
        app.setValue(this, 'hidden', false);
        app.setValue(this, 'title', '驳回理由');
        app.setValue(this, 'userid', e.currentTarget.dataset.userid);
    },
    setly: function (e) {
        this.setData({
            ly: e.detail.value
        })
    },
    getGsadminList: function (res) {
        app.setValue(this, "plist", res.data.data)
    },
    //conker 审核通过按钮
    sayyes: function (e) {
        var me = this;
        var sCmd = {
            "cmd": "user.TrialUser",
            "data": {
                "trialflag": 1,
                "squserid": e.currentTarget.dataset.userid,
                "type": "公司管理员"
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

    },

    //conker理由关闭按钮
    cancel: function (e) {
        app.setValue(this, 'hidden', true);
    },
    //conker理由提交按钮
    confirm: function (e) {
        var me = this;
        var sCmd = {
            "cmd": "user.TrialUser", "data": {
                "trialflag": -1,
                "ly": this.data.ly,
                "squserid": this.data.userid,
                "type": "公司管理员"
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
})

var app = getApp().data.factory;