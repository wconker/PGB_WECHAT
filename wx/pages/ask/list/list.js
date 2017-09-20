var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置 广播添加完成
var WxNotificationCenter = require("../../../utils/WxNotificationCenter.js");
Page({
    data: {
        tabs: ["询价中", "我的询价", "我的报价"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        sHeight: 0,
        xjList: [],
        myxjList: [],
        mybjList: [],
        isRepost: false,
        xjid: '',
        isFirst: false,
        timeToend: "",
        currentTarget_id: 0,
        local: '',
        xjzPage: 1,
        wdxjPage: 1,
        wdbjPage: 1,

    },

    onLoad: function () {
        var that = this;
        //parm1 服务端返回的数据的cmd， parm2 自定义函数用于接收数据，  parm3 当前函数的作用域
        WxNotificationCenter.addNotification("business.getxjList", this.getXJList, this) 
        WxNotificationCenter.addNotification("business.getMyxjList", this.getMyxjList, this)
        WxNotificationCenter.addNotification("business.getMybjList", this.getMybjList, this)
        WxNotificationCenter.addNotification("business.closeXj", this.closeXj, this)
        WxNotificationCenter.addNotification("business.endXj", this.endXj, this)


        this.setData({ isFirst: true })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                    sHeight: res.windowHeight,
                });
            }
        });
        this.reloadData()

    },

    getpostionCity: function () {
        //获取定位地址
        WxNotificationCenter.addNotification("business.getYwCity", this.getYwCity, this)
        var sCmd = { "cmd": "business.getYwCity", "data": {} };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },

    setpostionCity: function (valuedqdm) {
        WxNotificationCenter.addNotification("business.setYwCity", this.setYwCity, this)
        var sCmd = { "cmd": "business.setYwCity", "data": { dqdm: valuedqdm } };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },

    changeCity: function (e) {
        wx.navigateTo({
            url: '/pages/core/selectcity/selectcity'
        })

    },

    setYwCity: function (res) {

        if (res.data.code == 0) {
            this.getpostionCity();

            var sCmd = { "cmd": "business.getxjList", "data": {} };
            WxNotificationCenter.postNotificationName("send", sCmd);
        }


    },

    getYwCity: function (res) {


        this.setData({ local: res.data.data[0].dqmc });
        console.log(res);
        WxNotificationCenter.removeNotification("business.getYwCity", this)

    },
    onShow: function () {

        var count = 0;
        var me = this;
        setInterval(function () {
            count++;
            me.setData({
                timeToend: count
            })
        }, 1000);


        if (getApp().data.city != "!!!" && getApp().judge(getApp().data.city)) {
            this.setpostionCity(getApp().data.city.dqdm)
            this.reloadData()
        }

        getApp().data.city = "!!!";
        this.getpostionCity();
    },
    onHide: function () {
        // WxNotificationCenter.removeNotification("business.getxjList", this)
        // WxNotificationCenter.removeNotification("business.getMyxjList", this)
        // WxNotificationCenter.removeNotification("business.getMybjList", this)
        // WxNotificationCenter.removeNotification("business.closeXj", this)
        // WxNotificationCenter.removeNotification("business.endXj", this)

    },

    onUnload: function () {
        WxNotificationCenter.removeNotification("business.getbjInfo", this)
        WxNotificationCenter.removeNotification("business.getMybjInfo", this)
        WxNotificationCenter.removeNotification("business.acceptBj", this)
        WxNotificationCenter.removeNotification("business.rejectBj", this)
        WxNotificationCenter.removeNotification("business.getYwCity", this)
        WxNotificationCenter.addNotification("business.setYwCity", this)
    },

    reloadData: function () {
        var sCmd = {};
        switch (this.data.activeIndex) {
            case "0":     //询价中
                this.setData({ currentTarget_id: 0, xjzPage: 1 })
                sCmd = { "cmd": "business.getxjList", "data": {} };
                break;
            case "1":     //我的询价
                this.setData({ currentTarget_id: 1, wdxjPage: 1 })
                sCmd = { "cmd": "business.getMyxjList", "data": {} };
                break;
            case "2":     //我的报价
                this.setData({ currentTarget_id: 2, wdbjPage: 1 })
                sCmd = { "cmd": "business.getMybjList", "data": {} };
                break;
        }
        WxNotificationCenter.postNotificationName("send", sCmd);
    },

    getMoreInfo: function () {
        var sCmd = {};
        var page
        switch (this.data.activeIndex) {
            case "0":     //询价中
                page = this.data.xjzPage + 1
                console.log(page)
                this.setData({ currentTarget_id: 0, xjzPage: page })
                sCmd = { "cmd": "business.getxjList", "data": { page: page } };
                break;
            case "1":     //我的询价
                page = this.data.wdxjPage + 1
                this.setData({ currentTarget_id: 1, wdxjPage: page })
                sCmd = { "cmd": "business.getMyxjList", "data": { page: page } };
                break;
            case "2":     //我的报价
                page = this.data.wdbjPage + 1
                this.setData({ currentTarget_id: 2, wdbjPage: page })
                sCmd = { "cmd": "business.getMybjList", "data": { page: page } };
                break;
        }

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000
        })

        WxNotificationCenter.postNotificationName("send", sCmd);
    },

    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        this.reloadData()
    },

    //发起询价
    bindNew: function (event) {
        var pageUrl;
        pageUrl = '/pages/ask/new/new';
        wx.navigateTo({
            url: pageUrl
        })
    },

    //重新发布
    bindRepost: function (e) {
        var that = this
        var zt = this.data.myxjList[e.target.dataset.select].zt;
        if (zt == -2 || zt == 3 || zt == -1) {

            var pageUrl;
            pageUrl = '/pages/ask/new/new?xjid=' + e.target.id + '&fromPage=-2';
            wx.navigateTo({
                url: pageUrl
            })

        } else {
            this.setData({ isRepost: true, xjid: e.target.id })
            var sCmd = { "cmd": "business.endXj", "data": { "xjid": e.target.id } };
            WxNotificationCenter.postNotificationName("send", sCmd);
        }
    },

    //结案
    bindCloseXj: function (e) {
        var sCmd = { "cmd": "business.closeXj", "data": { "xjid": e.target.id } };
        WxNotificationCenter.postNotificationName("send", sCmd);
    },

    //终止询价
    bindEndXj: function (e) {

        wx.showModal({
            title: '提示',
            content: '确定终止询价？',
            success: function (res) {
                if (res.confirm) {
                    var sCmd = { "cmd": "business.endXj", "data": { "xjid": e.target.id } };
                    WxNotificationCenter.postNotificationName("send", sCmd);
                }
            }
        })

    },

    //查看询价详情
    bindDetail: function (event) {
        var pageUrl;
        pageUrl = '/pages/ask/detail/detail?xjid=' + event.currentTarget.id + '&fromPage=XjList';
        wx.navigateTo({
            url: pageUrl
        })
    },

    //查看我的询价详情
    bindMyDetail: function (event) {
        var pageUrl;
        pageUrl = '/pages/ask/detail/detail?xjid=' + event.currentTarget.id + '&fromPage=myXjList';
        wx.navigateTo({
            url: pageUrl
        })
    },

    //查看报价详情
    bindAnswerDetail: function (event) {
        var pageUrl;
        pageUrl = '/pages/ask/answerdetail/answerdetail?bjid=' + event.currentTarget.id;
        wx.navigateTo({
            url: pageUrl
        })
    },

    //取询价列表
    getXJList: function (res) {
        wx.stopPullDownRefresh()
        switch (res.data.code) {
            case 0:
                if (this.data.xjzPage == 1) {
                    this.setData({ xjList: res.data.data })
                    console.log('询价列表1：',this.data.xjList)
                } else {
                    var xjList = this.data.xjList
                    if (res.data.data.length == 0) {
                        this.showToast()
                    } else {
                        for (var item in res.data.data) {
                            xjList.push(res.data.data[item])
                            console.log('询价列表2：', this.data.xjList)
                        }
                        this.setData({ xjList: xjList })
                    }
                }
                break;
            default:
                break;
        }
    },

    //我的询价
    getMyxjList: function (res) {
        wx.stopPullDownRefresh()
        switch (res.data.code) {
            case 0:
                if (this.data.wdxjPage == 1) {
                    this.setData({ myxjList: res.data.data })
                } else {
                    var myxjList = this.data.myxjList
                    if (res.data.data.length == 0) {
                        this.showToast()
                    } else {
                        for (var item in res.data.data) {
                            myxjList.push(res.data.data[item])
                        }
                        this.setData({ myxjList: myxjList })
                    }
                }
                break;
            default:
                break;
        }
    },

    //我的报价
    getMybjList: function (res) {
        wx.stopPullDownRefresh()
        switch (res.data.code) {
            case 0:
                if (this.data.wdbjPage == 1) {
                    this.setData({ mybjList: res.data.data })
                } else {
                    var mybjList = this.data.mybjList
                    if (res.data.data.length == 0) {
                        this.showToast()
                    } else {
                        for (var item in res.data.data) {
                            mybjList.push(res.data.data[item])
                        }
                        this.setData({ mybjList: mybjList })
                    }
                }
                break;
            default:
                break;
        }
    },

    showToast: function () {
        wx.showToast({
            title: "以获取到所有数据!",
            icon: 'success',
            duration: 2000
        })
    },

    //结案
    closeXj: function (res) {
        switch (res.data.code) {
            case 0:
                wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 2000
                })
                this.reloadData()

                break;
            default:
                wx.showToast({
                    title: res.data.message,
                    icon: 'warn',
                    duration: 2000
                })
                break
        }
    },

    //终止询价
    endXj: function (res) {
        var that = this
        console.log("this.data.isRepost", this.data.isRepost)
        if (this.data.isRepost) {
            this.setData({ isRepost: false })

            // success
            var pageUrl;
            pageUrl = '/pages/ask/new/new?xjid=' + that.data.xjid + '&fromPage=-1';
            wx.navigateTo({
                url: pageUrl
            })

        } else {
            switch (res.data.code) {
                case 0:
                    wx.showToast({
                        title: res.data.message,
                        icon: 'success',
                        duration: 2000
                    })
                    this.reloadData()

                    break;
                default:
                    wx.showToast({
                        title: res.data.message,
                        icon: 'warn',
                        duration: 2000
                    })
                    break
            }
        }

    },

    refresh: function (e) {
        // console.log(e.currentTarget.id)
        // var sCmd
        // switch (e.currentTarget.id) {
        //     case "0":     //询价中
        //         sCmd = { "cmd": "business.getxjList", "data": {} };
        //         break;
        //     case "1":     //我的询价
        //         sCmd = { "cmd": "business.getMyxjList", "data": {} };
        //         break;
        //     case "2":     //我的报价
        //         sCmd = { "cmd": "business.getMybjList", "data": {} };
        //         break;
        //     default:
        //         break;
        // }
        // wx.showToast({
        //     title: '刷新中',
        //     icon: 'loading',
        //     duration: 1000
        // })
        // WxNotificationCenter.postNotificationName("send", sCmd);
        // this.onLoad()
    },
    loadMore: function (e) {

        // this.setData({page: this.data.page + 1})
        console.log(e.currentTarget.id)
        console.log("上拉拉加载更多...." + this.data.page)

        // this.getDataFromServer(this.data.page)
    },

    onPullDownRefresh: function () {
        var sCmd
        switch (this.data.currentTarget_id) {
            case 0:     //询价中
                this.setData({ xjzPage: 1 })
                sCmd = { "cmd": "business.getxjList", "data": {} };
                break;
            case 1:     //我的询价
                this.setData({ wdxjPage: 1 })
                sCmd = { "cmd": "business.getMyxjList", "data": {} };
                break;
            case 2:     //我的报价
                this.setData({ wdbjPage: 1 })
                sCmd = { "cmd": "business.getMybjList", "data": {} };
                break;
            default:
                break;
        }
        wx.showToast({
            title: '刷新中',
            icon: 'loading',
            duration: 1000
        })
        WxNotificationCenter.postNotificationName("send", sCmd);
        this.onLoad()
    }



});