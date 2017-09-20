var WxNotificationCenter = require("../../../../utils/WxNotificationCenter.js");//广播添加完成
var app = getApp();
Page({
    data: {
        imgFrontUpMsg: "",
        imgBackUpMsg: "",
        rotate: 0,
        windowWidth: 0,
        files: "",
        files_back: '',
        zsxm: "",
        sfzhm: "",
        user: {},
        warn: 0,


    },
    onLoad: function (options) {
        var me = this;
        wx.getSystemInfo({
            success: function (res) {
                me.setData({
                    windowWidth: res.windowWidth
                })
                console.log(res.windowWidth);
            }
        });
        var sCmd = { "cmd": "user.getUserinfo", "data": {} };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },
    onShow: function () {
        WxNotificationCenter.addNotification("user.getUserinfo", this.getUserinfo, this)
        WxNotificationCenter.addNotification("user.Certification", this.Certification, this)
    },
    onHide: function () {
        WxNotificationCenter.removeNotification("user.getUserinfo", this)
        WxNotificationCenter.removeNotification("user.Certification", this)
    },
    onUnload: function () {
        WxNotificationCenter.removeNotification("user.getUserinfo", this)
        WxNotificationCenter.removeNotification("user.Certification", this)
    },
    chooseImage_front: function (e) {
        var that = this;
        if (getApp().data.user.scrzbz == 2) {
            wx.showToast({
                title: "认证已通过！",
                icon: 'success',
                duration: 1500
            });
            return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var temp = [];
                temp.push(res.tempFilePaths.length > 1 ? res.tempFilePaths[res.tempFilePaths.length - 1] : res.tempFilePaths[0]);
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: temp
                });
                var sData = {
                    "userid": getApp().data.userid,
                    "imgtype": encodeURI('身份证正面'),
                }
                wx.uploadFile({
                    url: getApp().data.url,
                    filePath: temp[0],
                    name: 'file',
                    formData: sData,
                    header: { "content-type": 'application/x-www-form-urlencoded' },
                    success: function (res) {
                        that.setData({
                            "imgFrontUpMsg": res.errMsg
                        });
                        console.log("log", res);

                    }, fail: function (res) {
                        that.setData({
                            "imgFrontUpMsg": res.errMsg
                        });
                        console.log("fail", res);
                    }
                })
            }
        })
    },
    checkId: function (value) {
        //身份证正则表达式(15位) 
        var isId1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //身份证正则表达式(18位) 
        var isId2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|X)$/;
        if (!((isId1.test(value)) || (isId2.test(value))))
            return false
        return true;
    },
    chooseImage_back: function (e) {
        var that = this;
        if (getApp().data.user.scrzbz == 2) {
            wx.showToast({
                title: "认证已通过！",
                icon: 'success',
                duration: 1500
            });
            return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var temp = [];
                temp.push(res.tempFilePaths.length > 1 ? res.tempFilePaths[res.tempFilePaths.length - 1] : res.tempFilePaths[0]);
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files_back: temp
                });
                var sData = {
                    "userid": getApp().data.userid,
                    "imgtype": encodeURI('身份证反面'),

                }
                wx.uploadFile({
                    url: getApp().data.url,
                    filePath: temp[0],
                    name: 'file',
                    formData: sData,
                    header: { "content-type": 'application/x-www-form-urlencoded' },
                    success: function (res) {
                        that.setData({
                            "imgBackUpMsg": res.errMsg
                        })

                    }, fail: function (res) {
                        that.setData({
                            "imgBackUpMsg": res.errMsg
                        })
                    }
                })
            }
        });
    },
    setsfzhm: function (e) {
        if (!this.checkId(e.detail.value)) {
            this.setData({ warn: 1 })
        } else {
            this.setData({ warn: 0 })

        }
        this.setData({ sfzhm: e.detail.value });
    },
    setzsxm: function (e) {

        this.setData({ zsxm: e.detail.value })

    },
    bindOk: function (ev) {
        var me = this;
        //todo...数据校验
        var sCmd = { "cmd": "user.Certification", "data": { "xm": me.data.zsxm, "sfzh": me.data.sfzhm, "form_id": ev.detail.formId } };

        WxNotificationCenter.postNotificationName("send", sCmd);

    },
    getUserinfo: function (res) {
        switch (res.data.code) {
            case 0:
                this.setData({
                    files: res.data.data[0].sfzzm_img == "" ? 'https://www.yiqiyun.org/filepgb/file_img/sfz_modle.jpg' : res.data.data[0].sfzzm_img,
                    files_back: res.data.data[0].sfzfm_img == "" ? 'https://www.yiqiyun.org/filepgb/file_img/sfz_modle_other.jpg' : res.data.data[0].sfzfm_img,
                    sfzhm: res.data.data[0].sfzh,
                    zsxm: res.data.data[0].xm,
                    user: res.data.data[0]
                })
                break;
            default:
                wx.showToast({
                    title: res.data.message,
                    icon: 'fail',
                    duration: 2000
                })
                break;
        }

    },
    Certification: function (res) {
        switch (res.data.code) {
            case 0:
                wx.navigateBack({
                    delta: 1,
                    success: function () {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'success',
                            duration: 2000
                        })
                        // var sCmd = { "cmd": "user.getUserinfo", "data": {} };
                        // WxNotificationCenter.postNotificationName("send", sCmd);
                    }

                })
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
})