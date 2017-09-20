Page({
  data: {
      bt:'',
      options:[],
      othersFlag:0,
      others:'',
  },

  bindTap: function(e){
      getApp().data.select = e.currentTarget.id
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
  },

  bindChange: function(e){
    this.setData({others:e.detail.value})
  },

  //清空
   bindClear: function(e){
      getApp().data.select = ''
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
  },

  //OK
   bindOk: function(e){
     if(this.data.others==''){
       wx.showToast({
          title: '请输入其它信息',
          icon: 'warn',
          duration: 3000
        })
       return
     }

      getApp().data.select = this.data.others
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
  },

  onLoad: function (e) {
    var o = e.options.split(',')
    var theLast = o.pop()
     if(theLast=='其它' || theLast=='其他'){
       this.setData({othersFlag:1})
    }else{
      o = e.options.split(',')
    }
    this.setData({bt: e.bt})
    this.setData({options: o})
    getApp().data.select = '!!!'
  },
});