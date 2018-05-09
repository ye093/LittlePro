import { getToken } from './tokenStorage.js';

// 服务器配置
const SER_URL = "https://yejinyun.cn";

const request = (options) => {
  let user_token = getToken();
  options['url'] = `${SER_URL}${options.url}`;
  options['header'] = {
    ...options.header,
    user_token
  };
  wx.request(options);
};

const showLoading = ({ title='玩命加载', ...tail } = {} ) => {
  wx.showLoading({
    title: title,
    ...tail
  });
};

const hideLoading = () => {
  wx.hideLoading();
};

module.exports = {
  request,
  showLoading,
  hideLoading
}
