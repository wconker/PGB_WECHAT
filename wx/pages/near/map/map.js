var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    Height: 0,
    scale: 12,
    latitude: "",
    longitude: "",
    markers: [],
    group: 0,
    mapHeight: '',
    circles: []
  },

  onHide: function () {
    WxNotificationCenter.removeNotification("admin.getWzList", this)
  },

  toRad: function (d) { return d * Math.PI / 180; },
  distance: function (lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = this.toRad(lat1);
    var radLat2 = this.toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = this.toRad(lng1) - this.toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

    return dis * 6378137;

  },

  onShow: function () {
    WxNotificationCenter.addNotification("admin.getWzList", this.getWzList, this)
    this.sendWZList();
  },
  mypos: function () {
    var me = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        me.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#f2f2f2',
            fillColor: '#7cb5ec88',
            radius: 50000,
            strokeWidth: 1
          }]
        })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //检索地址
  searchTo: function () {
    var me = this;
    wx.chooseLocation({
      success: function (res) {
        var g = 0;
        for (var i = 0; i < me.data.markers.length; i++) {
          if (me.distance(me.data.markers[i].latitude, me.data.markers[i].longitude, res.latitude, res.longitude) < 5000) {

            if (me.distance(me.data.markers[i].latitude, me.data.markers[i].longitude, res.latitude, res.longitude) > 5) {
              ++g;
              console.log(me.distance(me.data.markers[i].latitude, me.data.markers[i].longitude, res.latitude, res.longitude));
            }
          }
        }
        me.setData({ group: g });
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (res_) {
            me.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              circles: [{
                latitude: res.latitude,
                longitude: res.longitude,
                color: '#f2f2f2',
                fillColor: '#7cb5ec88',
                radius: 5000,
                strokeWidth: 1
              }]
            })
          }
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },

  getAddressCode: function (res) {
  },

  //检索的文本框
  filterworld: function (e) {

    this.setData({ address: e.detail.value });

  },

  //---------------------------定位描图部分-----------------------

  //获取每个人的地点信息列表
  getWzList: function (res) {
    var _this = this;
    var markArr = [];
    var data = res.data.data;

    //获取用勘察信息记录到market
    for (var c = 0; c < data.addressdata.length; c++) {

      markArr.push({
        id: c,
        latitude: parseFloat(data.addressdata[c].wd),
        longitude: parseFloat(data.addressdata[c].jd),
        width: 25,
        height: 25,
        iconPath: "/images/build.png",
        title: data.addressdata[c].bdw,
        phone: data.addressdata[c].zbid
      })
    }

    //获取用户地址并记录到market
    for (var i = 0; i < data.name.length; i++) {
      markArr.push({
        id: i,
        latitude: parseFloat(data.name[i].wd),
        longitude: parseFloat(data.name[i].jd),
        width: 25,
        height: 25,
        iconPath: "/images/person2.png",
        title: data.name[i].xm,
        phone: data.name[i].sjhm
      })
    }

    wx.getSystemInfo({
      success: function (res) {
        console.log('当前屏幕的宽高：', res)
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({

          controls: [
            // {
            //     id: 1,
            //     iconPath: '/images/sub.png',
            //     position: {
            //         left: 300,
            //         top: 100 - 50,
            //         width: 20,
            //         height: 20
            //     },
            //     clickable: true
            // },
            // {
            //     id: 2,
            //     iconPath: '/images/add.png',
            //     position: {
            //         left: 320,
            //         top: 100 - 50,
            //         width: 20,
            //         height: 20
            //     },
            //     clickable: true
            // },
            {
              id: 3,
              iconPath: '/images/soso.png',
              position: {
                left: res.screenWidth - 60,
                bottom: 0,
                top: res.windowHeight - 155,
                width: 60,
                height: 60
              },
              clickable: true
            },

          ],
          mapHeight: res.windowHeight
        })
      }
    })

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var gg = 0;
        for (var i = 0; i < markArr.length; i++) {
          if (_this.distance(markArr[i].latitude, markArr[i].longitude, res.latitude, res.longitude) < 5000) {

            console.log(_this.distance(markArr[i].latitude, markArr[i].longitude, res.latitude, res.longitude));
            if (_this.distance(markArr[i].latitude, markArr[i].longitude, res.latitude, res.longitude) > 5);
            {
              gg++;
            }
          }

        }
        _this.setData({
          group: gg,
          latitude: res.latitude,
          longitude: res.longitude,
          markers: markArr,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#f2f2f2',
            fillColor: '#7cb5ec88',
            radius: 5000,
            strokeWidth: 1
          }]
        })
      }
    })
  },

  onLoad: function () {
   
  },


  regionchange(e) {
    //console.log("regionchange===" + e.type)
  },


  sendWZList: function () {
    var sCmd = { "cmd": "admin.getWzList", "data": {} };
    WxNotificationCenter.postNotificationName("send", sCmd);
  },

  //---------------------------操作部分-----------------------
  //点击merkers
  markertap(e) {
    var me = this;
    console.log(me.data.markers[e.markerId])
    if (me.data.markers[e.markerId].phone > 0) {
      wx.showActionSheet({
        itemList: [this.data.markers[e.markerId].title],
        success: function (res) {


          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '/pages/task/detail/detail?zbid=' + me.data.markers[e.markerId].phone,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }


        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    // console.log("scale===" + this.data.scale)
    switch (e.controlId) {

      case 1:
        that.setData({
          scale: --this.data.scale
        })
        break;
      case 2:
        that.setData({
          scale: ++this.data.scale
        })
        break;
      case 3:
        that.searchTo();
        break;

      case 4:
        that.mypos();
        break;

    }
  },
})