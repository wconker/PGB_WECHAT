Page({
  data: {
      bt:'',
      options:[],
      selects:[],
      othersFlag:0,
      others:'',
  },

  bindTap: function(e){
    var sVar = 'selects[' + e.currentTarget.id + ']'
    if(this.data.selects[e.currentTarget.id]=='1'){
      this.setData({[`${sVar}`]: "0"})
    }else{
      this.setData({[`${sVar}`]: "1"})
    }
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
    //  if(this.data.others=='' && this.data.othersFlag == 1){
    //    wx.showToast({
    //       title: '请输入其它信息',
    //       icon: 'warn',
    //       duration: 3000
    //     })
    //    return
    //  }
     //组装选中的选项
     var sValue=""
     for(var i = 0;i < this.data.selects.length; i++) {
       if(this.data.selects[i]=='1'){
         sValue = sValue + this.data.options[i] + ' '
       }
     }

     //其他选项
     if(this.data.othersFlag == 1 && this.data.others!=''){
       sValue = sValue + this.data.others
     }

      getApp().data.select = sValue
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
    console.log(o)
    var s = Array(o.length)
    this.setData({bt: e.bt})
    this.setData({options: o})
    this.setData({selects: s})
    getApp().data.select = '!!!'
  },
});