import { setToken, removeToken } from './tokenStorage.js';
import { request, showLoading, hideLoading } from './wxApi.js';

const userLogin = () => {
  //已过期
  removeToken();
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'https://yejinyun.cn/authorize/wx?js_code=' + res.code,
          method: 'POST',
          success: function (res) {
            if (res.data.code === 0) {
              // 登录成功
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
              });
              setToken(res.data.data.token);
            } else {
              // 登录失败
              wx.showToast({
                title: res.data.msg,
              });
            }
          }
        })
      }
    },
    fail: function () {
      wx.showToast({
        title: '登录失败，请重新启动',
      })
    }

  });
};

// 获取当前用户信息
const fetchUserInfo = () => {
  showLoading();
  wx.getUserInfo({
    withCredentials: true,
    lang: 'zh_CN',
    success(res) {
      console.log(JSON.stringify(res));
      if (res.encryptedData) {
        request({
          url: '/wx/user/fetch',
          method: 'POST',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          success(obj) {
            console.log(JSON.stringify(obj));
          }
        });
      }
      hideLoading();
    },
    fail() {
      hideLoading();
    },
    complete() {
    }
  });
};

module.exports = {
  userLogin,
  fetchUserInfo
}
