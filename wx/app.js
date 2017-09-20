var factory = require("utils/Factory.js");//辅助类
// var mWebSocket = require("utils/reconnecting-websocket.min.js");
var WxNotificationCenter = require("utils/WxNotificationCenter.js");
var mCmd = {}
App({
  onLaunch: function () {
    mCmd = {}
    this.login()
    WxNotificationCenter.addNotification("send", this.send, this)
  },
  jd: '',
  wd: '',
  login: function () {
    //微信登录
    var me = this;
    var nc = ""
    var avatarUrl
    var city = ''
    //获取微信当前用户的基本信息,返回的是微信的id
    wx.login({
      success: function (res) {
        //获取经纬度坐标
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success: function (mypos) {
            me.jd = mypos.longitude;
            me.wd = mypos.latitude;
             //获取用户信息
            wx.getUserInfo({
              success: function (resUserInfo) {
                var userInfo = JSON.parse(resUserInfo.rawData)
                nc = userInfo.nickName
                avatarUrl = userInfo.avatarUrl
                city = userInfo.city
                if (me.judge(mCmd)) {
                  WxNotificationCenter.postNotificationName("send", mCmd);
                }
              },
              fail: function () {
                nc = ""
                avatarUrl = ""
                city = ''
              },
              complete: function () {

                //我们自己的登录 用于获取用户信息
                var login_cmd = {
                  "cmd": "user.Login",
                   "data": {
                    "qd": "wx", "code": res.code, "nc": nc, "tx": avatarUrl, "city": city,
                    "jd": me.jd, "wd": me.wd
                  }
                };    
             
                // 向我们的服务器发送登录请求
                //为了获取个人个人相关的信息，
                // 比如sign 和userid
                wx.request({
                  url: getApp().data.url,
                  data: login_cmd,
                  method: 'POST',
                  success: function (resLogin) {
                    //获取到服务器返回的个人数据
                    //并保存到本地一般后续请求时适用，
                    // 比如sign 和userid


                    //当前用户的识别码
                    getApp().data.sign = resLogin.data.data.sign
                    getApp().data.userid = resLogin.data.data.userid
                    wx.request({
                      url: getApp().data.url,
                      data: { "cmd": "user.getUserinfo", "data": { userid: getApp().data.userid, sign: getApp().data.sign } },
                      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                      // header: {}, // 设置请求的 header
                      success: function (resInfo) {
                        me.setToastVoice(resInfo)
                        getApp().data.smsflag = resInfo.data.data[0].smsflag;
                        getApp().data.email = resInfo.data.data[0].dzyx
                        getApp().data.local = { "dqdm": resInfo.data.data[0].city, "dqmc": resInfo.data.data[0].city_name } //获取当前用户所在的地区

                        // console.error(getApp().data.local)
                      }
                    })

                    me.onBackground();

                  }, fail: function (res) {
                  }
                });
              }
            })
          }

        })
      
      },
       fail: function (res) {
      }
    })

    // this.playVoices();
    // this.onBackground();
  },

  onBackground: function () {

    var that = this;

    that.connectWebSocket()

    wx.onSocketError(function (res) {
      // console.log('WebSocket连接打开失败，请检查！')
    })

    wx.onSocketMessage(function (data_) {
      // console.log("onSocketMessage onSocketMessage")
      that.socketOperation(data_)
    })

    wx.onSocketClose(function (res) {
      // console.log('WebSocket 已关闭！')
      that.connectWebSocket()
    })
  },

  //连接websocket
  connectWebSocket: function () {
    wx.connectSocket({
      url: this.data.wws,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // console.log("sxd  connectSocket", res)
      },
      fail: function (res) {
        // console.log("sxd  connectSocket", res)
      }
    })

    wx.onSocketOpen(function () {
      // callback
      var mCmd = { "cmd": "connect.Connect", "data": { userid: getApp().data.userid, sign: getApp().data.sign } }
      wx.sendSocketMessage({
        data: JSON.stringify(mCmd),
        success: function (res) {
          // console.log("sxd  sendSocketMessage  success", res)
          // success
        },
        fail: function (res) {
          // console.log("sxd  sendSocketMessage  fail", res)
        }
      })

    })

  },

  socketOperation: function (res) {
    // console.log(res)
    var that = this
    switch (JSON.parse(res.data).cmd) {
      case "connect.Connect":
        break;
      case "checkOnline":
        // console.log("checkOnline")
        var mCmd = { "cmd": "connect.checkOnline", "data": { userid: getApp().data.userid, sign: getApp().data.sign } }
        wx.sendSocketMessage({
          data: JSON.stringify(mCmd)
        })

        break;
      case "connect.checkOnline":
        break;
      case "NewZbInfo":
      case "NewXjInfo":
        if (getApp().data.smsflag == 1) {
          that.playVoices()
        }
        break;
      default:
        // if (getApp().data.smsflag == 1) {
        //   that.playVoices()
        // }
        break;
    }
  },

  //播放提示音
  playVoices: function () {
    try {
      var tone = wx.getStorageSync('toastVoice')
      if (tone) {
        wx.playVoice({
          filePath: tone,
          success: function (res_) {

          }, fail: function (res_) {
          }
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  },

  //设置提示音
  setToastVoice: function (res) {
    var that = this
    wx.getStorage({//获取本地提示音md5值
      key: 'toastVoiceMD5',
      success: function (res_toastVoiceMD5) {
        if (res_toastVoiceMD5.data != res.data.data[0].tone_md5) {//获取本地提示音md5值与服务器的不一致 则操作保存提示音操作
          try {
            wx.setStorageSync('toastVoiceMD5', res.data.data[0].tone_md5)
            that.saveVoiceVoice(res)
          } catch (e) {
          }
        }
      }, fail: function () {
        wx.setStorage({
          key: 'toastVoiceMD5',
          data: res.data.data[0].tone_md5
        })
        that.saveVoiceVoice(res)
      }
    })
  },

  //保存提示音
  saveVoiceVoice: function (res) {
    var that = this
    wx.downloadFile({//下载提示音
      url: res.data.data[0].tone_url,
      success: function (res_down) {
        wx.saveFile({//保存提示音文件到本地
          tempFilePath: res_down.tempFilePath,
          success: function (res_) {//保存成功 在缓存中保存路径
            var savedFilePath = res_.savedFilePath
            wx.getStorage({
              key: 'toastVoice',
              success: function (res_tone) {
                wx.setStorageSync('toastVoice', savedFilePath)
              },
              fail: function () {
                wx.setStorage({
                  key: 'toastVoice',
                  data: savedFilePath
                })
              }
            })
          },
          fail: function (res_) {//保存失败 声音md5置空 已备下次保存提示音
            wx.setStorage({
              key: 'toastVoiceMD5',
              data: ''
            })
          }
        })
      }, fail: function () {//下载失败 声音md5置空 已备下次保存提示音
        wx.setStorage({
          key: 'toastVoiceMD5',
          data: ''
        })
      }
    })
  },

  send: function (info) {//info参数就是一个对象
    var that = this
    console.log(this);//this就是指的是getApp这个全局函数（不要在定义于App()内的函数中调用getApp()，使用this就可以拿到app实例。）
    console.log("index发送过来的info:", info);
    console.log('send message:', this.addCommonInfo(info));
    console.log(getApp());//全局的getApp()函数,其实就是一个e｛｝对象
    wx.request({
      url: this.data.url,
      data: this.addCommonInfo(info),
      method: 'POST',
      success: function (res) {
        console.log('看看返回的res是什么：', res);
        console.log('服务端返回的数据:', res.data);
        switch (res.data.code) {
          case "1111"://sign 失效
          case "2222"://sign 超时
            mCmd = info
            that.login()
            break;
          default:
            WxNotificationCenter.postNotificationName(res.data.cmd, res);//发送通知
            break;
        }
      }, fail: function (e) {
        //TODO
        // me.setData({ phonemsg: res.data.message })
      }
    });
  },
  //统一绑定userid和sign
  addCommonInfo: function (info) {
    info.data["userid"] = getApp().data.userid
    info.data["sign"] = getApp().data.sign
    console.log('看看赋值后的info：', info);
    return info
  },
  //对象非空判断
  judge: function (obj) {
    for (var i in obj) {//如果不为空，则会执行到这一步，返回true
      return true;
    }
    return false;
  },
  //验证手机号码
  checkPhone: function (phone) {

    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false
    } else {
      return true;
    }
  },

  // globalData: {
  //   userInfo: null,
  // },

  data: {
    url: 'https://www.yiqiyun.org/apppgb/',
    wws: 'wss://www.yiqiyun.org/wspgb/',
    // userInfo: {},
    select: '',//选择中间结果
    city: {},
    jgmc: '',//绑定公司中间结果
    sign: '',
    userid: 0,
    user: {},//?
    gsmt: '',//?
    yyzz: '',//?
    local: {},//定位所在城市
    comp: {},
    //conker定义一个辅助类，在app里注册就可以在全局引用
    factory: factory,
    email: '',
    result: {},
    smsflag: 0//是否开启提示音 1开启0关闭
  }
})