var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
    data: {
        Height: 0,
        scale: 13,
        latitude: "",
        longitude: "",
        markers: [],
        controls: [{
            id: 1,
            iconPath: '/images/sub.png',
            position: {
                left: 320,
                top: 100 - 50,
                width: 20,
                height: 20
            },
            clickable: true
        },
        {
            id: 2,
            iconPath: '/images/add.png',
            position: {
                left: 340,
                top: 100 - 50,
                width: 20,
                height: 20
            },
            clickable: true
        }
        ],
        circles: []
    },
    onHide: function () {
        WxNotificationCenter.removeNotification("admin.getWzList", this)
    },


    getWzList: function (res) {

        var markArr = [];
        var data = res.data.data;
        console.log(data[1].xm);
        for (var i = 0; i < data.length; i++) {
            markArr.push({
                id: i,
                latitude: parseFloat(data[i].wd),
                longitude: parseFloat(data[i].jd),
                width: 25,
                height: 25,
                iconPath: "/images/maps.png",
                title: data[i].xm,
                phone: data[i].sjhm
            })
        }


        var _this = this;
        wx.getSystemInfo({
            success: function (res) {
                //设置map高度，根据当前设备宽高满屏显示
                _this.setData({
                    view: {
                        Height: res.windowHeight
                    }
                })
            }
        })




        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                _this.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: markArr,
                    circles: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        color: '#f2f2f2',
                        fillColor: '#7cb5ec88',
                        radius: 500,
                        strokeWidth: 1
                    }]
                })
            }
        })
    },

    onLoad: function () {
        WxNotificationCenter.addNotification("admin.getWzList", this.getWzList, this)

        var sCmd = { "cmd": "admin.getWzList", "data": {} };
        WxNotificationCenter.postNotificationName("send", sCmd);

    },
    regionchange(e) {
        //console.log("regionchange===" + e.type)
    },
    //点击merkers
    markertap(e) {
        // var me=this;
        // wx.showActionSheet({
        //     itemList: [this.data.markers[e.markerId].title, this.data.markers[e.markerId].phone],
        //     success: function (res) {
        //         console.log(res.tapIndex)


        //         if (res.tapIndex == 1) {
        //             wx.makePhoneCall({
        //                 phoneNumber:  me.data.markers[e.markerId].phone
        //             })
        //         }
        //     },
        //     fail: function (res) {
        //         console.log(res.errMsg)
        //     }
        // })
    },
    //点击缩放按钮动态请求数据
    controltap(e) {
        var that = this;
        // console.log("scale===" + this.data.scale)
        if (e.controlId === 1) {
            // if (this.data.scale === 13) {
            that.setData({
                scale: --this.data.scale
            })
            // }
        } else {
            //  if (this.data.scale !== 13) {
            that.setData({
                scale: ++this.data.scale
            })
            // }
        }
    },
})