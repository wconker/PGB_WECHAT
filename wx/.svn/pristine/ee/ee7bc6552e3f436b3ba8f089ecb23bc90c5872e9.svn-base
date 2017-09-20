/*提现*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
var point = 0;
var length = 0;
var pointNum = 0;
Page({
    onLoad: function (option) {

    },
    onShow: function () {
        WxNotificationCenter.addNotification("user.ApplyWxTransfer", this.ApplyWxTransfer, this)
    },

    onHide: function () {

        WxNotificationCenter.removeNotification("user.ApplyWxTransfer", this)
    },
    onUnload: function () {
        WxNotificationCenter.removeNotification("user.ApplyWxTransfer", this)
    },
    bindKeyInput: function (e) {
        if (e.detail.value.length <= 1) {
            point = 0; length = 0; pointNum = 0;
        }

        if (length < e.detail.value.length) {
            if (e.detail.value[e.detail.value.length - 1] == '.') {
                if (point < 1) {
                    console.log("point", point)
                    point++
                    length++
                } else {
                    console.log("point del")
                    return e.detail.value.substring(0, e.detail.value.length - 1);
                }
            } else {
                if (point == 1) {
                    pointNum++
                }
                if (pointNum > 2) {
                    pointNum--
                    return e.detail.value.substring(0, e.detail.value.length - 1);
                } else {
                    length++
                }
            }
        } else if (length > e.detail.value.length) {
            length--
            if (e.detail.value[e.detail.value.length - 1] == '.') {
                point--
            }
            if (point == 1) {
                pointNum--
            }
        }
        this.setData({ je: e.detail.value })
    },
    bindOk: function () {
        if (this.data.je == null || this.data.je == "") {
            wx.showModal({
                title: '请输入提现金额',
                content: '',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {

                    }
                }
            })
            return
        }
        var sCmd = { "cmd": "user.ApplyWxTransfer", "data": { "fee": this.data.je, "re_user_name": getApp().data.user.xm } };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },
    generateMixed: function () {
        var res = "";
        for (var i = 0; i < 32; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += jschars[id];
        }
        return res;
    },

    ApplyWxTransfer: function (res) {
        switch (res.data.code) {
            case 0:
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
                break;
            default:
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000
                })
                break;
        }
    }
});