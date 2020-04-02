//app.js
import AV from './pages/libs/av-weapp-min.js';

App({
  onLaunch: function () {
    AV.init({
      appId: "4v3onpmhVqBDAGxR291zkUbf-gzGzoHsz",
      appKey: "vxzb5hCKXTtUgdcEc8adlIUs",
      serverURLs: "https://api.leancloud.cn"
    });
  },
  onError: function (msg) {
    console.log(msg);
  },
  globalData: {
    userName: ''
  }
})