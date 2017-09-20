Page({
  data: {
    data: {}
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({ data: getApp().data.result })
    console.log(this.data.data);
  },
  taxCalculate: function () {
  
   wx.navigateTo({
     url: '/pages/tool/counter/counter?single='+this.data.data.pgdj+'&total='+this.data.data.pgzj,
  
   })

  }
})