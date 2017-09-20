//index.js  无需添加广播
//获取应用实例
var app = getApp()  
Page({  
  data: {  
    x_menus:[
      {title:'求职',icon:'/images/icon_lookfor.png'},
      {title:'招聘',icon:'/images/icon_job.png'},
      {title:'行业资讯',icon:'/images/icon_news.png'},
      {title:'实名认证',icon:'/images/icon_smrz.png'},
      {title:'房产估价师认证',icon:'/images/icon_fcgjsrz.png'},
      {title:'土地估价师认证',icon:'/images/icon_tdgjsrz.png'},
      {title:'手机绑定',icon:'/images/icon_sjhm.png'},
      {title:'邮箱绑定',icon:'/images/icon_email.png'},
      {title:'个人信息设置',icon:'/images/icon_set.png'},
      {title:'充值',icon:'/images/icon_recharge.png'},
      {title:'提现',icon:'/images/icon_cash.png'}
    ],
  },  
  //事件处理函数
  bindMenuTap: function(event) {
    var pageUrl;
    switch (event.currentTarget.id){
      case '求职':
        pageUrl = '/pages/jobwanted/list/list';
        break;
      case '招聘':
        pageUrl = '/pages/recruit/list/list';
        break;
      case '行业资讯':
        pageUrl = '/pages/news/list/list';
        break;
      case '实名认证':
        pageUrl = '/pages/mine/auth/certification/certification';
        break;
      case '房产估价师认证':
        pageUrl = '/pages/mine/auth/fcpgs_auth/fcpgs_auth';
        break;
      case '土地估价师认证':
        pageUrl = '/pages/mine/auth/tdpgs_auth/tdpgs_auth';
        break;
      case '手机绑定':
        pageUrl = '/pages/mine/bindinfo/bindinfo?witch=2';
        break;
      case '邮箱绑定':
        pageUrl = '/pages/mine/bindinfo/bindinfo?witch=1';
        break;
      case '个人信息设置':
        pageUrl = '/pages/mine/person/person';
        break;
      case '充值':
        pageUrl = '/pages/mine/pay/pay';
        break;
      case '提现':
        pageUrl = '/pages/mine/withdraw/withdraw';
        break;
    };
     wx.navigateTo({url: pageUrl})
  },

  
  onLoad: function () {  
    // console.log('index onLoad test');  

  }  ,
  
})  