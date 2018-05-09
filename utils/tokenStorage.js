export function getToken() {
  return wx.getStorageSync('token') || '';
}

export function setToken(token) {
  wx.setStorageSync('token', token);
}

export function removeToken() {
  wx.removeStorageSync('token');
}