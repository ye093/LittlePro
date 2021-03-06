//app.js
const wxUser = require('./utils/user.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // 先检查本地Token
    var userToken = wx.getStorageSync('token') || '';
    if (userToken.length > 0) {
      //检测用户登录状态
      wx.checkSession({
        success: function() {
          console.log('登录态有效');
        },
        fail: function() {
          wxUser.userLogin();
        },
      });
    } else {
      wxUser.userLogin();
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取设备信息
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.globalData.systemInfo = res;
      },
      fail: function() {

      },
      complete: function() {

      }
    })
  },
  globalData: {
    userInfo: null,
    systemInfo: null
  }
})