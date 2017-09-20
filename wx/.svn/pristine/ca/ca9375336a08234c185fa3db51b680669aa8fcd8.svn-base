var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");//广播添加完成
Page({
  data: {
    searchtext: '',
    list: [],
    worldList: [],
    decoration: [
      {
        text: '毛坯',
        value: '1'
      }, {
        text: '简单装修',
        value: '2'
      }, {
        text: '中档装修',
        value: '3'
      }, {
        text: '高档装修',
        value: '4'
      }
    ],
    special: [
      {
        text: '底层送大院落',
        value: '1'
      }, {
        text: '底层送小院落',
        value: '2'
      }, {
        text: '顶层送大阁楼和露台',
        value: '3'
      }, {
        text: '顶层送小阁楼和露台',
        value: '4'
      }, {
        text: '无',
        value: '5'
      }, {
        text: '底层送院落和1层地下室',
        value: '6'
      }, {
        text: '底层送院落和2层地下室',
        value: '7'
      }, {
        text: '跃层',
        value: '8'
      }

    ],
    jzmj: 0,
    tsqk: 1,
    zxqk: 1,
    xqbh: 0,
    zh: 0,
    dy: 0,
    lc: 0,
    hbh: 0,
    index: 0,
    show: 0,
  },
  onLoad: function (options) {
    WxNotificationCenter.addNotification("conn.selectCommunity", this.selectCommunity, this)
  },
  delettext: function () {
    this.setData({
      searchtext: "",
      worldList: [],
      index: 0,
      list: [],
      show: 0
    })

  },
  //上一步
  up: function (e) {
    var arr = this.data.worldList;
    arr.splice(arr.length - 1, 1);
    var fist = this.data.index;
    var tindex;


    tindex = fist - 2;
    this.setData({
      worldList: arr,
      index: tindex,
      show: 0
    });
    this.chooseCmd(this.data.index);
    this.writeinseach();
  },
  //后退时搜索栏的字也回退
  writeinseach: function (val) {
    var arr = this.data.worldList;
    if (val != null) {
      arr.push(val);
    }
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      str += arr[i];
    }
    this.setData({
      searchtext: str
    });
  },
  selectCommunity: function (res) {
    var arr = [];
    var message = res.data.message;
    switch (message) {
      case "选择小区成功!":
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({ name: res.data.data[i].xqmc, value: res.data.data[i].xqbh });
        }
        this.setData({
          list: arr,
          index: 1
        });

        wx.hideToast()

        WxNotificationCenter.removeNotification("conn.selectCommunity", this)
        break;
      case "选择幢成功":
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({ name: res.data.data[i].zm, value: res.data.data[i].zh });
        }
        this.setData({
          list: arr,
          index: 2
        });

        wx.hideToast()

        WxNotificationCenter.removeNotification("conn.selectBuildingNo", this)
        break;
      case "选择单元成功":
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({ name: res.data.data[i].dym, value: res.data.data[i].dy });
        }
        this.setData({
          list: arr,
          index: 3
        });
        wx.hideToast()

        WxNotificationCenter.removeNotification("conn.selectUnitNo", this)
        break;
      case "选择楼层成功":
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({ name: res.data.data[i].lcm + '层', value: res.data.data[i].lcs });
        }
        this.setData({
          list: arr,
          index: 4
        });

        wx.hideToast()

        WxNotificationCenter.removeNotification("conn.selectFloor", this)
        break;
      case "选择户成功":
      console.log("选择户成功",res);
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({ name: res.data.data[i].hm + '室', value: res.data.data[i].hbh, jzmj: res.data.data[i].jzmj });
        }
        this.setData({
          list: arr,
          index: 6,
    
         
        });
        wx.hideToast();
        WxNotificationCenter.removeNotification("conn.selectDoorNo", this)
        break;
      case "智能估价成功":
     
       wx.hideLoading();
        getApp().data.result = res.data.data[0];
        wx.navigateTo({
          url: "/pages/tool/result/result",
        })
        break;
      default:
        wx.showToast({
          title: res.data.message,
        })

        break;
    }


    if (message == "请提交查询条件【建筑面积(jzmj)】") {
      wx.showToast({
        title: message,
        icon: 'success',
        duration: 3000
      })
    }
  },
  filterworld: function (e) {
    // this.setData({
    //   searchtext: e.detail.value
    // });
    WxNotificationCenter.addNotification("conn.selectCommunity", this.selectCommunity, this)
    var sCmd = { "cmd": "conn.selectCommunity", "data": { "xqmc": e.detail.value } };
    WxNotificationCenter.postNotificationName("send", sCmd);

  },
  chooseCmd: function (indx, e) {
    var me = this;
    console.log(e.target.dataset);
    switch (indx) {
      // case 0:
      //     WxNotificationCenter.addNotification("conn.selectCommunity", this.selectCommunity, this)
      //     var sCmd = { "cmd": "conn.selectCommunity", "data": {} };
      //     WxNotificationCenter.postNotificationName("send", sCmd);
      //     wx.showToast({
      //         title: '加载中',
      //         icon: 'loading',
      //         duration: 10000
      //     })
      //     break;
      case 1:
        
          this.setData({
            xqbh: e.target.dataset.select.value
          });
        
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask: true
        })

        me.cmd("selectBuildingNo");
        break;
      case 2:
        
          this.setData({
            zh: e.target.dataset.select.value
          });
        
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask: true
        })

        me.cmd("selectUnitNo");

        break;
      case 3:
       
          this.setData({
            dy: e.target.dataset.select.value
          });
       
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask: true
        })

        me.cmd("selectFloor");
        break;
      case 4:
    
          this.setData({
            lc: e.target.dataset.select.value
          });
       
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000,
          mask:true
        })
        me.cmd("selectDoorNo");
        break;
      case 6:
  
  console.log(e,"---------------")
          this.setData({
            hbh: e.target.dataset.select.value,
            show: 1,
            jzmj:e.target.dataset.select.jzmj
            
           
          });
      
        break;
    }
  },
  select: function (e) {
    var me = this;
    this.chooseCmd(me.data.index, e);
    console.log(me.data.index)
    this.writeinseach(e.target.dataset.select.name);

  },
  //发送指令
  cmd: function (key) {
    var me = this;
    switch (key) {
      case 'selectBuildingNo'://撞
        WxNotificationCenter.addNotification("conn.selectBuildingNo", this.selectCommunity, this)
        var sCmd = { "cmd": "conn.selectBuildingNo", "data": { "xqbh": me.data.xqbh } };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      case 'selectUnitNo': //单元
        WxNotificationCenter.addNotification("conn.selectUnitNo", this.selectCommunity, this)
        var sCmd = { "cmd": "conn.selectUnitNo", "data": { "xqbh": me.data.xqbh, "zh": me.data.zh } };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      case 'selectFloor': //楼层
        WxNotificationCenter.addNotification("conn.selectFloor", this.selectCommunity, this)
        var sCmd = { "cmd": "conn.selectFloor", "data": { "xqbh": me.data.xqbh, "zh": me.data.zh, "dy": me.data.dy } };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
      case 'selectDoorNo': //选择户
        WxNotificationCenter.addNotification("conn.selectDoorNo", this.selectCommunity, this)
        var sCmd = { "cmd": "conn.selectDoorNo", "data": { "xqbh": me.data.xqbh, "zh": me.data.zh, "lcs": me.data.lc, "dy": me.data.dy } };
        WxNotificationCenter.postNotificationName("send", sCmd);
        break;
    }

  },
  submit: function () {
    WxNotificationCenter.addNotification("conn.evaluate", this.selectCommunity, this)
    var sCmd = { "cmd": "conn.evaluate", "data": { "hbh": this.data.hbh, "jzmj": this.data.jzmj, "zxqk": this.data.zxqk, "tsqk": this.data.tsqk } };
    WxNotificationCenter.postNotificationName("send", sCmd);
    wx.showLoading({
      title: '计算中...',
    })
  },
  binddecorationChange: function (e) {
    this.setData({
      zxqk: e.detail.value
    });
  },
  bindspecialChange: function (e) {
    this.setData({
      tsqk: e.detail.value
    });
  },
  setjzmj: function (e) {
    this.setData({
      jzmj: e.detail.value
    });
  },
  onHide: function () {
    WxNotificationCenter.removeNotification("conn.evaluate", this);
  }



})