Page({
    data: {
        data: {}
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '来盛物流'
        });
        WxNotificationCenter.addNotification("conn.getWlinfo", this.getWlinfo, this)
        var sCmd = { "cmd": "conn.getWlinfo", "data": { "gsbh": options.gsid } };
        WxNotificationCenter.postNotificationName("send", sCmd);


    },
    getWlinfo: function (res) {

console.log(res.data)

        this.setData({
            data: res.data.data[0]
        })
        WxNotificationCenter.removeNotification("conn.getWlList", this)
    }
})
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成