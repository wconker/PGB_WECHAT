//conker 辅助类，在此定义全局的函数

var WxNotificationCenter = require("WxNotificationCenter.js");

//conker 同一弹框提示
function alert(title, conent) {
  //显示模态弹窗(就是一个弹窗)
  wx.showModal({
    title: title,
    showCancel: false,
    content: conent,
    success: function (res) {
      if (res.confirm) {

      }
    }
  })
}

//显示消息提示框
function showToast(title, duration) {
  wx.showToast({
    title: title,
    icon: 'success',
    duration: duration
  })
}

//conker 统一方法设置成员变量，写setdata太麻烦了
function setValue(context, key, value) {
  var me = context;
  var keyworld = key;
  me.setData({
    [`${keyworld}`]: value
  })
}

function resiverUserInfo(res) {
  getApp().data.user = res.data.data

}


//conker 检查getuserinfo 有没有
function checkuser() {

  if (getApp().data.user.userid == null) {

    return false;
  }
  else {

    return true;
  }

}

module.exports = {
  setValue: setValue,
  alert: alert,
  showToast: showToast,
  checkuser: checkuser

}
