//logs.js
const util = require('../../utils/util.js')
import { fetchUserInfo } from '../../utils/user.js'

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    fetchUserInfo();
  }
})
