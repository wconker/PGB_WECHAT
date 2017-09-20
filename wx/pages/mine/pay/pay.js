/*充值*/
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
var point = 0;
var length = 0;
var pointNum = 0;
Page({
    data: {

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
                title: '请输入充值金额',
                content: '',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {

                    }
                }
            })
            return
        }

        wx.showToast({
            title: "生成支付单",
            icon: 'loading',
            duration: 10000
        })

        var sCmd = { "cmd": "user.applyWxPay", "data": { "total_fee": this.data.je, "body": "评估帮在线充值" } };
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

    onLoad: function (e) {

    },
    onShow: function () {
        WxNotificationCenter.addNotification("user.applyWxPay", this.applyWxPay, this)
    },

    onHide: function () {
        WxNotificationCenter.removeNotification("user.applyWxPay", this)
    },
    onUnload: function () {
        WxNotificationCenter.removeNotification("user.applyWxPay", this)
    },

    applyWxPay: function (res) {
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
    }
});